// components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "See live updates on presidential golf trips and taxpayer costs.", 
  image = "https://istrumpgolfing.today/files/istrumpgolfing.webp",
  path = "/"
}) => {
  const url = `https://istrumpgolfing.today${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;
