
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    // Simulate password reset email
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
      toast({
        title: 'Email sent',
        description: 'If an account exists with that email, we\'ve sent a password reset link.',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          {emailSent ? (
            <div className="space-y-4 text-center">
              <p className="text-green-600">
                Email sent! Check your inbox for a password reset link.
              </p>
              <div className="mt-4">
                <Link 
                  to="/login" 
                  className="text-primary hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <Link to="/login" className="hover:text-primary underline underline-offset-4">
                    Back to Login
                  </Link>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
