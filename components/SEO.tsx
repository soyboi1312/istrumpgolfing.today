// components/SEO.tsx
import Head from 'next/head';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../utils/constants';

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
  image = DEFAULT_OG_IMAGE,
  path = "/",
  isGolfing
}) => {
  // FIX: Ensure path ends with a slash if it's not the root, 
  // because trailingSlash: true is set in next.config.js.
  // This prevents canonical URL mismatches (e.g., /about vs /about/).
  const cleanPath = path === '/' ? path : path.replace(/\/$/, '') + '/';
  const url = `${SITE_URL}${cleanPath}`;
  
  // Default to "Work Mode" (Presidential Seal)
  // If confirmed golfing, switch to Golf Mode
  const favicon = isGolfing === true
    ? "/files/fav/golf-mode.svg"
    : "/files/fav/work-mode.svg";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* ADDED: Explicitly control crawling behavior */}
      <meta name="robots" content="index, follow" />
      
      {/* FIX: Added 'key' to force replacement and '?v=' to bust browser cache. */}
      <link 
        rel="icon" 
        type="image/svg+xml" 
        href={`${favicon}?v=1`} 
        key="dynamic-favicon" 
      />
      
      <link rel="alternate icon" href="/files/fav/favicon.ico" /> 
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;