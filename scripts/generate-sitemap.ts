// scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';

// Constants
const SITE_URL = 'https://istrumpgolfing.today';
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

// Define your pages here. 
// Empty string '' represents the homepage ('/').
const pages = [
  '',
  'cost-breakdown',
  'comparison',
  'about',
  'embed'
];

const generateSitemap = () => {
  console.log('Generatng sitemap...');
  
  const today = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map((page) => {
    // Ensure trailing slash consistency with next.config.js
    const route = page ? `/${page}/` : '/'; 
    
    // Prioritize home slightly higher
    const priority = page === '' ? '1.0' : '0.8';
    const changeFreq = page === '' ? 'daily' : 'weekly';
    
    return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();