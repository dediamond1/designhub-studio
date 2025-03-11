
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { SEO } from "@/utils/seo";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation(['notFound', 'common']);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/10 p-4">
      <SEO 
        title={t('title')}
        description={t('description')}
        canonicalUrl={`https://kalmarstudio.com${location.pathname}`}
        lang={i18n.language}
      />
      
      <div className="max-w-md w-full text-center">
        <div className="space-y-6">
          <h1 className="text-8xl font-bold text-primary/70">{t('heading')}</h1>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{t('message')}</h2>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          
          <div className="pt-4">
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('button')}
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              URL: <span className="font-mono">{location.pathname}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
