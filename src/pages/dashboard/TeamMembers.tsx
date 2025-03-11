
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// Define the form schema for inviting a team member
const inviteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  role: z.enum(['admin', 'team-member'], {
    required_error: 'Please select a role',
  }),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

// Define the User type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: Date;
};

// Dummy team members data
const dummyTeamMembers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    role: 'admin',
    lastLogin: new Date()
  },
  {
    id: '2',
    name: 'Another User',
    email: 'another@example.com',
    role: 'user',
    lastLogin: new Date(Date.now() - 86400000) // yesterday
  },
  {
    id: '3',
    name: 'Team Member',
    email: 'team@example.com',
    role: 'team-member',
    lastLogin: new Date(Date.now() - 86400000 * 7) // a week ago
  }
];

const TeamMembers = () => {
  const { toast } = useToast();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>(dummyTeamMembers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'team-member'>('team-member');
  
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'team-member',
    },
  });
  
  // Handle invite submission
  const onInviteSubmit = async (values: InviteFormValues) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add the new team member to the state
      const newMember: User = {
        id: `${teamMembers.length + 1}`,
        name: values.name,
        email: values.email,
        role: values.role,
        lastLogin: undefined
      };
      
      setTeamMembers([...teamMembers, newMember]);
      
      toast({
        title: 'Invitation Sent',
        description: `An invitation has been sent to ${values.email}`,
      });
      
      setIsInviteOpen(false);
      form.reset();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send invitation';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
  
  // Handle role change
  const handleRoleChange = async (userId: string, newRole: 'admin' | 'team-member' | 'user') => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the team member's role in the state
      setTeamMembers(prevMembers => 
        prevMembers.map(member => 
          member.id === userId ? { ...member, role: newRole } : member
        )
      );
      
      toast({
        title: 'Role Updated',
        description: 'User role has been updated successfully',
      });
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update role';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
  
  // Handle user deletion
  const handleDeleteUser = async () => {
    try {
      if (!userToDelete) return;
      
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Remove the team member from the state
      setTeamMembers(prevMembers => 
        prevMembers.filter(member => member.id !== userToDelete)
      );
      
      toast({
        title: 'User Deleted',
        description: 'User has been removed from the team',
      });
      
      setIsConfirmDeleteOpen(false);
      setUserToDelete(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
  
  // Opening delete confirmation dialog
  const confirmDelete = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmDeleteOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>Invite Team Member</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team. They'll receive an email with instructions.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onInviteSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select 
                        onValueChange={(value: 'admin' | 'team-member') => {
                          field.onChange(value);
                          setSelectedRole(value);
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="team-member">Team Member</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Invitation'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their access levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && !isInviteOpen && !isConfirmDeleteOpen ? (
            <div className="text-center py-4">Loading team members...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-4">No team members found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Select 
                        defaultValue={member.role}
                        onValueChange={(value) => {
                          // Only update if the value is a valid role
                          if (value === 'admin' || value === 'team-member' || value === 'user') {
                            handleRoleChange(member.id, value as 'admin' | 'team-member' | 'user');
                          }
                        }}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder={member.role} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="team-member">Team Member</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {member.lastLogin 
                        ? new Date(member.lastLogin).toLocaleDateString() 
                        : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        onClick={() => confirmDelete(member.id)}
                        className="text-red-500 hover:text-red-700"
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the user
              from your team and revoke their access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamMembers;
