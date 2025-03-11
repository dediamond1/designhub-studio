
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useAuthContext } from '@/hooks/useAuth';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO, createWebsiteSchema } from '@/utils/seo';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  
  // Schema with i18n messages
  const loginSchema = z.object({
    email: z.string().email(t('auth.login.emailError', 'Please enter a valid email address')),
    password: z.string().min(6, t('auth.login.passwordError', 'Password must be at least 6 characters')),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    
    const result = await login({
      email: data.email,
      password: data.password
    });
    
    setLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  // SEO schema
  const schema = createWebsiteSchema(
    'Kalmar Studio - Login',
    'https://kalmarstudio.com/login'
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SEO 
        title="Login | Kalmar Studio"
        description="Log in to your Kalmar Studio account to manage your orders, designs, and profile."
        canonicalUrl="https://kalmarstudio.com/login"
        schema={schema}
        lang={i18n.language}
      />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('auth.login.title')}</CardTitle>
          <CardDescription>
            {t('auth.login.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.login.emailLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('auth.login.emailPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t('auth.login.passwordLabel')}</FormLabel>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-primary hover:underline"
                      >
                        {t('auth.login.forgotPassword')}
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder={t('auth.login.passwordPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('auth.login.signingIn')}
                  </>
                ) : (
                  t('auth.login.signInButton')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <span>{t('auth.login.noAccount')} </span>
            <Link to="/register" className="text-primary hover:underline">
              {t('auth.login.signUp')}
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              {t('common.backToHome')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
