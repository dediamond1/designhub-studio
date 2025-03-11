
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Verifying your email...');

  useEffect(() => {
    // Simulate verification process
    const timeout = setTimeout(() => {
      if (!token) {
        setVerificationStatus('error');
        setMessage('Invalid verification link. Please request a new verification email.');
      } else {
        setVerificationStatus('success');
        setMessage('Your email has been successfully verified! You can now login to your account.');
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>
            {verificationStatus === 'loading' ? 'Verifying your email address' : 
             verificationStatus === 'success' ? 'Email verification successful' : 'Verification failed'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6">
          {verificationStatus === 'loading' ? (
            <div className="animate-pulse h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-primary/40"></div>
            </div>
          ) : verificationStatus === 'success' ? (
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          ) : (
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          )}
          <p className="text-center mt-4">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          {verificationStatus !== 'loading' && (
            <Button asChild>
              <Link to="/login">
                Proceed to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
