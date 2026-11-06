const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found. Run build first.');
  process.exit(1);
}

let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

// Fix for Microsoft Clarity Live View & Session Replay:
// 1. Strip `crossorigin` from stylesheet tags so Clarity's replay proxy never fails CORS
// 2. Copy hashed main CSS to a permanent `/assets/index.css` so Clarity replays work across deploys
const assetsDir = path.join(distDir, 'assets');
if (fs.existsSync(assetsDir)) {
  const cssFiles = fs.readdirSync(assetsDir).filter(f => /^index-[^.]+\.css$/.test(f));
  if (cssFiles.length > 0) {
    const mainCssPath = path.join(assetsDir, cssFiles[0]);
    fs.copyFileSync(mainCssPath, path.join(assetsDir, 'index.css'));
  }
}
indexHtmlContent = indexHtmlContent.replace(
  /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/[^"]+\.css)"\s*\/?>/gi,
  '<link rel="stylesheet" href="$1" />\n  <link rel="stylesheet" href="/assets/index.css" />'
);
fs.writeFileSync(indexHtmlPath, indexHtmlContent);

const BASE_URL = 'https://medestra.me';

// Basic pages
const pages = [
  'about',
  'services',
  'markets',
  'contact',
  'faq',
  'academy',
  'courses',
  'books',
  'verify-certificate',
  'policies',
  'checkout',
  'products',
  'products/mepos',
  'meni-clinic',
  'products/meni-clinic',
  'blog',
  'meta-ads-master',
  'meta-ads-manager',
  'pharmacy-sales',
  'bobo',
  'medestra-admin-tools-cert-gen-8x9q',
  'dr-salah-qari'
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



/**
 * Encodes a file path for use in a URL (encodes spaces and special chars, keeps slashes).
 */
function encodeImagePath(p) {
  return p.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

/**
 * Injects custom OG meta tags into the HTML <head> for social sharing previews.
 * Removes any existing og: / twitter: tags first so LinkedIn reads ours.
 */
function injectOgTags(html, { title, description, image, url, author, date }) {
  const encodedImage = `${BASE_URL}${encodeImagePath(image)}`;
  const safeTitle = title.replace(/"/g, '&quot;');
  const safeDesc = description.replace(/"/g, '&quot;');

  // Strip ALL existing og: and twitter: meta tags to avoid duplicates
  let cleanHtml = html
    .replace(/<meta\s+property="og:[^"]*"[^\/]*\/>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^\/]*\/>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');

  // Replace the generic <title> with the article title
  cleanHtml = cleanHtml.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${safeTitle} | Medestra Blog</title>`
  );

  // Also update generic meta description
  cleanHtml = cleanHtml.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${safeDesc}" />`
  );

  let ogTags = `
    <!-- Article OG Tags -->
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${encodedImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Medestra" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${encodedImage}" />`;

  if (author) {
    ogTags += `\n    <meta name="author" content="${author}" />\n    <meta property="article:author" content="${author}" />`;
  }
  if (date) {
    ogTags += `\n    <meta property="article:published_time" content="${date}" />`;
  }

  // Inject immediately after <head> so they appear first
  return cleanHtml.replace('<head>', `<head>${ogTags}`);
}

// Create folders and index.html for basic pages
pages.forEach(page => {
  if (page === 'meniclinic' || page === 'MeniClinic') {
    // Preserve the standalone MeniClinic app build in dist/MeniClinic
    return;
  }
  const dirPath = path.join(distDir, page);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (page === 'meni-clinic' || page === 'products/meni-clinic') {
    const meniHtml = injectOgTags(indexHtmlContent, {
      title: 'Meni Clinic CRM | نظام إدارة العيادات والمراكز الطبية Poly Clinics',
      description: 'نظام Meni Clinic من ميديسترا: أقوى سيستم CRM لإدارة العيادات والمراكز الطبية (Poly Clinics فقط) في مصر والسعودية وإيطاليا. إدارة الحجوزات، التاريخ المرضي، التقارير المالية، محاكاة حية لصالة الانتظار والدخول للطبيب، وتقارير إحصائية شاملة.',
      image: '/photos/Meni Clinic.webp',
      url: `${BASE_URL}/${page}`
    });
    fs.writeFileSync(path.join(dirPath, 'index.html'), meniHtml);
  } else {
    fs.writeFileSync(path.join(dirPath, 'index.html'), indexHtmlContent);
  }
});

// Ensure standalone MeniClinic routes (/MeniClinic/login and lowercase fallback /meniclinic/login) are generated
const meniAppDir = path.join(distDir, 'MeniClinic');
const meniAppIndex = path.join(meniAppDir, 'index.html');
if (fs.existsSync(meniAppIndex)) {
  const meniAppHtml = fs.readFileSync(meniAppIndex, 'utf-8');
  const meniLoginDir = path.join(meniAppDir, 'login');
  if (!fs.existsSync(meniLoginDir)) {
    fs.mkdirSync(meniLoginDir, { recursive: true });
  }
  fs.writeFileSync(path.join(meniLoginDir, 'index.html'), meniAppHtml);

  // Also create lowercase /meniclinic and /meniclinic/login redirect/copies for case-insensitive access on Linux hosts
  const lowerMeniDir = path.join(distDir, 'meniclinic');
  const lowerLoginDir = path.join(lowerMeniDir, 'login');
  if (!fs.existsSync(lowerLoginDir)) {
    fs.mkdirSync(lowerLoginDir, { recursive: true });
  }
  fs.writeFileSync(path.join(lowerMeniDir, 'index.html'), meniAppHtml);
  fs.writeFileSync(path.join(lowerLoginDir, 'index.html'), meniAppHtml);
}

// Create folders and index.html for services
services.forEach(service => {
  const dirPath = path.join(distDir, 'service', service);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'index.html'), indexHtmlContent);
});

const tsContent = fs.readFileSync(path.join(__dirname, 'data', 'blogPosts.ts'), 'utf-8');

const blogPosts = [];
const slugs = [...tsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

slugs.forEach(slug => {
  const titleMatch = new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?title_en:\\s*(["'])(.*?)\\1`).exec(tsContent) || new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?title_ar:\\s*(["'])(.*?)\\1`).exec(tsContent);
  const descMatch = new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?excerpt_en:\\s*(["'])(.*?)\\1`).exec(tsContent) || new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?excerpt_ar:\\s*(["'])(.*?)\\1`).exec(tsContent);
  const imageMatch = new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?coverImage:\\s*(["'])(.*?)\\1`).exec(tsContent);
  const authorMatch = new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?author_en:\\s*(["'])(.*?)\\1`).exec(tsContent) || new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?author_ar:\\s*(["'])(.*?)\\1`).exec(tsContent);
  const dateMatch = new RegExp(`slug:\\s*["']${slug}["'][\\s\\S]*?date:\\s*(["'])(.*?)\\1`).exec(tsContent);
  
  blogPosts.push({
    slug,
    title: titleMatch ? titleMatch[2] : slug,
    description: descMatch ? descMatch[2] : '',
    image: imageMatch ? imageMatch[2] : '/photos/default-og.webp',
    author: authorMatch ? authorMatch[2] : 'Medestra',
    date: dateMatch ? dateMatch[2] : new Date().toISOString()
  });
});

// Create folders and index.html for blog posts with injected OG tags
blogPosts.forEach(post => {
  const dirPath = path.join(distDir, 'blog', post.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const customHtml = injectOgTags(indexHtmlContent, {
    title: post.title,
    description: post.description,
    image: post.image,
    url: `${BASE_URL}/blog/${post.slug}`,
    author: post.author,
    date: post.date,
  });
  fs.writeFileSync(path.join(dirPath, 'index.html'), customHtml);
});

// Create a 404.html just in case for unknown routes
// 404.html overwritten disabled to preserve SPA redirect

console.log('Comprehensive static routes generated successfully for GitHub Pages SEO.');
