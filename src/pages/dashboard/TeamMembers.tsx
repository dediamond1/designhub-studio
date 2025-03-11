
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User as UserIcon, 
  UserPlus, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Trash2,
  Edit 
} from 'lucide-react';
import { getUsers, updateRole, removeUser } from '@/api/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'team-member';
  createdAt?: string;
  lastLogin?: string;
}

const TeamMembers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'team-member' as 'admin' | 'team-member'
  });
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');
      return getUsers(user.id);
    },
    enabled: !!user?.id && user?.role === 'admin'
  });

  // Invite user mutation
  const inviteMutation = useMutation({
    mutationFn: async (data: typeof inviteForm) => {
      if (!user?.id) throw new Error('Not authenticated');
      return await fetch('/api/users/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          adminId: user.id,
          email: data.email,
          name: data.name,
          role: data.role
        })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Invitation sent',
        description: `An invitation has been sent to ${inviteForm.email}`,
      });
      setInviteOpen(false);
      setInviteForm({
        name: '',
        email: '',
        role: 'team-member'
      });
    },
    onError: (error) => {
      toast({
        title: 'Invitation failed',
        description: error instanceof Error ? error.message : 'Failed to send invitation',
        variant: 'destructive',
      });
    }
  });

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'user' | 'team-member' }) => {
      if (!user?.id) throw new Error('Not authenticated');
      return updateRole(user.id, userId, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Role updated',
        description: 'User role has been updated successfully',
      });
      setEditOpen(false);
      setSelectedUser(null);
    },
    onError: (error) => {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update user role',
        variant: 'destructive',
      });
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      if (!user?.id) throw new Error('Not authenticated');
      return removeUser(user.id, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'User deleted',
        description: 'User has been deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Failed to delete user',
        variant: 'destructive',
      });
    }
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    inviteMutation.mutate(inviteForm);
  };

  const handleEditRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    updateRoleMutation.mutate({
      userId: selectedUser.id,
      role: selectedUser.role
    });
  };

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case 'team-member':
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'team-member':
        return 'Team Member';
      default:
        return 'Regular User';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
              
              {user?.role === 'admin' && (
                <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite a Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your team. They'll receive an email with instructions to set up their account.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleInvite} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          value={inviteForm.name}
                          onChange={(e) => setInviteForm({...inviteForm, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="johndoe@example.com" 
                          value={inviteForm.email}
                          onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select 
                          value={inviteForm.role} 
                          onValueChange={(value: 'admin' | 'team-member') => 
                            setInviteForm({...inviteForm, role: value})
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="team-member">Team Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit" disabled={inviteMutation.isPending}>
                          {inviteMutation.isPending ? 'Sending invitation...' : 'Send Invitation'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <p>Loading team members...</p>
              </div>
            ) : (
              <div className="bg-card rounded-md border shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users && users.length > 0 ? (
                      users.map((teamMember: User) => (
                        <TableRow key={teamMember.id}>
                          <TableCell className="font-medium">{teamMember.name}</TableCell>
                          <TableCell>{teamMember.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getRoleIcon(teamMember.role)}
                              <span className="ml-2">{getRoleName(teamMember.role)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {teamMember.createdAt 
                              ? new Date(teamMember.createdAt).toLocaleDateString() 
                              : 'N/A'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              {user?.id !== teamMember.id && user?.role === 'admin' && (
                                <>
                                  <Dialog open={editOpen && selectedUser?.id === teamMember.id} onOpenChange={(open) => {
                                    setEditOpen(open);
                                    if (!open) setSelectedUser(null);
                                  }}>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(teamMember)}>
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Team Member</DialogTitle>
                                        <DialogDescription>
                                          Update role for {selectedUser?.name}
                                        </DialogDescription>
                                      </DialogHeader>
                                      
                                      <form onSubmit={handleEditRole} className="space-y-4 pt-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-role">Role</Label>
                                          <Select 
                                            value={selectedUser?.role} 
                                            onValueChange={(value: 'admin' | 'user' | 'team-member') => 
                                              setSelectedUser(prev => prev ? {...prev, role: value} : null)
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="admin">Administrator</SelectItem>
                                              <SelectItem value="team-member">Team Member</SelectItem>
                                              <SelectItem value="user">Regular User</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        
                                        <DialogFooter>
                                          <Button type="submit" disabled={updateRoleMutation.isPending}>
                                            {updateRoleMutation.isPending ? 'Updating...' : 'Update Role'}
                                          </Button>
                                        </DialogFooter>
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="sm" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete {teamMember.name}'s account and remove all associated data.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeleteUser(teamMember.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Shield className="h-8 w-8 mb-2" />
                            <h3 className="font-medium text-lg">No team members found</h3>
                            <p>Invite team members to collaborate with you</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeamMembers;
