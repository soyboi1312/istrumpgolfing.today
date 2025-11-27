// components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  isGolfing?: boolean; 
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "See live updates on presidential golf trips and taxpayer costs.", 
  image = "https://istrumpgolfing.today/files/istrumpgolfing.webp",
  path = "/",
  isGolfing
}) => {
  const url = `https://istrumpgolfing.today${path}`;
  
  // Default to "Work Mode" (Presidential Seal)
  // We use your 'work-mode.svg' filename here as per your request, 
  // but this should be the file containing the Presidential Seal content.
  let favicon = "/files/fav/work-mode.svg"; 
  let iconKey = "work";

  // If confirmed golfing, switch to Golf Mode
  if (isGolfing === true) {
    favicon = "/files/fav/golf-mode.svg";
    iconKey = "golf";
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* FIX: Added 'key' to force replacement and '?v=' to bust browser cache.
         The 'key' ensures Next.js knows this is the SAME tag changing, not a new one.
      */}
      <link 
        rel="icon" 
        type="image/svg+xml" 
        href={`${favicon}?v=1`} 
        key="dynamic-favicon" 
      />
      
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