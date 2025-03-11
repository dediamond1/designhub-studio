
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/services/authService';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUsers, updateRole, removeUser, invite } from '@/api/auth';
import { Loader2, PlusCircle, UserPlus, UserX, UserCheck, UserCog } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

interface TeamMembersPageProps {}

const TeamMembersPage: React.FC<TeamMembersPageProps> = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<'admin' | 'team-member'>('team-member');
  
  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'team-member'>('team-member');
  const [inviteLoading, setInviteLoading] = useState(false);
  
  // Role update state
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const result = await getUsers(user.id);
          setTeamMembers(result);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        toast({
          title: 'Error',
          description: 'Failed to load team members. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, [user, toast]);
  
  const handleInvite = async () => {
    if (!inviteEmail || !inviteName || !inviteRole) {
      toast({
        title: 'Missing information',
        description: 'Please fill out all fields to send an invitation.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setInviteLoading(true);
      
      if (user?.id) {
        await invite(user.id, inviteEmail, inviteName, inviteRole);
        
        toast({
          title: 'Invitation sent',
          description: `Successfully sent invitation to ${inviteEmail}`,
        });
        
        // Reset form
        setInviteEmail('');
        setInviteName('');
        setInviteRole('team-member');
        setInviteOpen(false);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast({
        title: 'Invitation failed',
        description: error instanceof Error ? error.message : 'Failed to send invitation',
        variant: 'destructive',
      });
    } finally {
      setInviteLoading(false);
    }
  };
  
  const handleRoleUpdate = async () => {
    if (!selectedMember || !newRole || !user?.id) return;
    
    try {
      setUpdateLoading(true);
      
      await updateRole(user.id, selectedMember.id, newRole);
      
      // Update local state
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === selectedMember.id 
            ? { ...member, role: newRole } 
            : member
        )
      );
      
      toast({
        title: 'Role updated',
        description: `${selectedMember.name}'s role has been updated to ${newRole}`,
      });
      
      setRoleDialogOpen(false);
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Failed to update user role',
        variant: 'destructive',
      });
    } finally {
      setUpdateLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedMember || !user?.id) return;
    
    try {
      setDeleteLoading(true);
      
      await removeUser(user.id, selectedMember.id);
      
      // Update local state
      setTeamMembers(prev => prev.filter(member => member.id !== selectedMember.id));
      
      toast({
        title: 'User removed',
        description: `${selectedMember.name} has been removed from the team`,
      });
      
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Deletion failed',
        description: error instanceof Error ? error.message : 'Failed to remove user',
        variant: 'destructive',
      });
    } finally {
      setDeleteLoading(false);
    }
  };
  
  const openRoleDialog = (member: User) => {
    setSelectedMember(member);
    setNewRole(member.role);
    setRoleDialogOpen(true);
  };
  
  const openDeleteDialog = (member: User) => {
    setSelectedMember(member);
    setDeleteDialogOpen(true);
  };
  
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>
                  You don't have permission to access this page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>This page is only accessible to administrators.</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Team Management</h1>
              <p className="text-muted-foreground">
                Manage your team members and their roles
              </p>
            </div>
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Invite Team Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite a Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your team. They'll receive an email with instructions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={inviteRole} 
                      onValueChange={(value) => setInviteRole(value as 'admin' | 'team-member')}
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
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleInvite}
                    disabled={inviteLoading || !inviteEmail || !inviteName}
                  >
                    {inviteLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Send Invitation
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                View and manage your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-8">
                  <UserX className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-lg font-medium">No team members yet</p>
                  <p className="text-muted-foreground">
                    Use the "Invite Team Member" button to add someone to your team
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {teamMembers.map((teamMember) => (
                    <div key={teamMember.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {teamMember.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">{teamMember.name}</p>
                          <p className="text-sm text-muted-foreground">{teamMember.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">
                          {teamMember.role === 'admin' ? 'Administrator' : 'Team Member'}
                        </div>
                        {teamMember.id !== user?.id && (
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openRoleDialog(teamMember)}
                            >
                              <UserCog className="h-4 w-4" />
                              <span className="sr-only">Change Role</span>
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => openDeleteDialog(teamMember)}
                            >
                              <UserX className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Role Update Dialog */}
          <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change User Role</DialogTitle>
                <DialogDescription>
                  Update the role for {selectedMember?.name}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-role">Select a new role</Label>
                  <Select 
                    value={newRole} 
                    onValueChange={(value) => setNewRole(value as 'admin' | 'team-member')}
                  >
                    <SelectTrigger id="new-role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="team-member">Team Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleRoleUpdate}
                  disabled={updateLoading || !selectedMember || selectedMember.role === newRole}
                >
                  {updateLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Role'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove {selectedMember?.name} from your team?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    'Remove'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
    </div>
  );
};

export default TeamMembersPage;
