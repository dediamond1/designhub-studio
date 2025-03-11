
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  schema?: Record<string, any>;
  lang?: string;
}

export const SEO = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://kalmarstudio.com/images/og-image.jpg',
  twitterCard = 'summary_large_image',
  schema,
  lang = 'en',
}: SEOProps) => {
  const schemaData = schema ? JSON.stringify(schema) : null;
  
  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* JSON-LD Schema */}
      {schemaData && (
        <script type="application/ld+json">{schemaData}</script>
      )}
    </Helmet>
  );
};

// Common schemas
export const createWebsiteSchema = (name: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url,
});

export const createOrganizationSchema = ({
  name,
  url,
  logo,
  description,
  address,
  phone,
  email,
  sameAs = [],
}: {
  name: string;
  url: string;
  logo: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  sameAs?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url,
  logo,
  description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: address,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: phone,
    email,
    contactType: 'customer service',
  },
  sameAs,
});

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
