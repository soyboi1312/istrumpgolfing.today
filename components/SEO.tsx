// components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  isGolfing?: boolean; // New optional prop
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "See live updates on presidential golf trips and taxpayer costs.", 
  image = "https://istrumpgolfing.today/files/istrumpgolfing.webp",
  path = "/",
  isGolfing
}) => {
  const url = `https://istrumpgolfing.today${path}`;
  
  // Determine dynamic favicon
  // Default to golf-mode if undefined, or you can keep your old .webp as a fallback
  let favicon = "/files/fav/work-mode.svg"; 
  if (isGolfing === true) {
    favicon = "/files/fav/golf-mode.svg";
  } else if (isGolfing === undefined) {
    // Optional: Fallback for pages where we don't know the status (like About page)
    favicon = "/files/fav/work-mode.svg"; 
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Dynamic Favicon */}
      <link rel="icon" type="image/svg+xml" href={favicon} />
      <link rel="alternate icon" href="/files/fav/favicon.ico" /> 
      
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