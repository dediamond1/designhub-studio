
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Kalmar Studio</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your dashboard</p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <LoginForm />
              <div className="text-center text-sm text-muted-foreground mt-4">
                <Link to="/" className="hover:text-primary underline underline-offset-4">
                  Back to Home
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <RegisterForm />
              <div className="text-center text-sm text-muted-foreground mt-4">
                <Link to="/" className="hover:text-primary underline underline-offset-4">
                  Back to Home
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
