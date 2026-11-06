const fs = require('fs');
const path = require('path');

// Basic pages
const pages = [
  '/',
  '/about',
  '/services',
  '/markets',
  '/contact',
  '/faq',
  '/academy',
  '/courses',
  '/books',
  '/verify-certificate',
  '/policies',
  '/checkout',
  '/products',
  '/products/mepos',
  '/meni-clinic',
  '/MeniClinic/login',
  '/products/meni-clinic',
  '/blog',
  '/meta-ads-master',
  '/meta-ads-manager',
  '/pharmacy-sales',
  '/bobo'
];

// Services
const services = [
  'bobo-super-intelligence',
  'social-media',
  'ecommerce',
  'customer-service',
  'content-marketing',
  'web-mobile',
  'training'
];

// Extract Blog posts dynamically
const tsContent = fs.readFileSync(path.join(__dirname, 'data', 'blogPosts.ts'), 'utf-8');
const blogSlugs = [...tsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {
  let priority = 0.8;
  if (page === '/') priority = 1.0;
  if (page === '/contact' || page === '/services' || page === '/about' || page === '/blog' || page === '/meta-ads-master' || page === '/pharmacy-sales' || page === '/meni-clinic' || page === '/products') priority = 0.9;
  if (page === '/policies' || page === '/checkout' || page === '/verify-certificate') priority = 0.5;

  sitemap += `  <url>\n`;
  sitemap += `    <loc>https://medestra.me${page === '/' ? '/' : page}</loc>\n`;
  sitemap += `    <priority>${priority.toFixed(1)}</priority>\n`;
  sitemap += `    <changefreq>monthly</changefreq>\n`;
  sitemap += `  </url>\n`;
});

services.forEach(service => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>https://medestra.me/service/${service}</loc>\n`;
  sitemap += `    <priority>0.8</priority>\n`;
  sitemap += `    <changefreq>monthly</changefreq>\n`;
  sitemap += `  </url>\n`;
});

blogSlugs.forEach(slug => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>https://medestra.me/blog/${slug}</loc>\n`;
  sitemap += `    <priority>0.7</priority>\n`;
  sitemap += `    <changefreq>monthly</changefreq>\n`;
  sitemap += `  </url>\n`;
});

sitemap += `</urlset>\n`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
console.log('Comprehensive Sitemap generated successfully.');
