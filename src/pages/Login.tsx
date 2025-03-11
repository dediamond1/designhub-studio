
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation(['login', 'common']);
  
  // Schema with i18n messages
  const loginSchema = z.object({
    email: z.string().email(t('emailError')),
    password: z.string().min(6, t('passwordError')),
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
    
    // Simulate login (no auth functionality)
    setTimeout(() => {
      setLoading(false);
      toast.success('Demo login successful');
      navigate('/dashboard');
    }, 1000);
  };

  // SEO schema
  const schema = createWebsiteSchema(
    'Kalmar Studio - Login',
    'https://kalmarstudio.com/login'
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <SEO 
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalUrl="https://kalmarstudio.com/login"
        schema={schema}
        lang={i18n.language}
      />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
          <CardDescription>
            {t('description')}
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
                    <FormLabel>{t('emailLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('emailPlaceholder')} {...field} />
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
                      <FormLabel>{t('passwordLabel')}</FormLabel>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-primary hover:underline"
                      >
                        {t('forgotPassword')}
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder={t('passwordPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('signingIn')}
                  </>
                ) : (
                  t('signInButton')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <span>{t('noAccount')} </span>
            <Link to="/register" className="text-primary hover:underline">
              {t('signUp')}
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              {t('common:buttons.backToHome')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
