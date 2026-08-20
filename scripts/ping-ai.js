import https from 'https';
import fs from 'fs';
import path from 'path';

// 1. Read sitemap.xml
const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
let urlList = [
  "https://medestra.me/ai-feed.json",
  "https://medestra.me/ai-glossary.json",
  "https://medestra.me/ai-faq.json",
  "https://medestra.me/llms.txt"
];

try {
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    // Regex to extract all <loc> URLs
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    let count = 0;
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      urlList.push(match[1]);
      count++;
    }
    console.log(`✅ Extracted ${count} URLs from sitemap.xml`);
  }
} catch (error) {
  console.log("⚠️ Could not read sitemap.xml, proceeding with AI files only.");
}

// Ensure unique URLs
urlList = [...new Set(urlList)];

const data = JSON.stringify({
  "host": "medestra.me",
  "key": "medestra-ai-indexnow-key-2026",
  "keyLocation": "https://medestra.me/medestra-ai-indexnow-key-2026.txt",
  "urlList": urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log(`🚀 [Medestra AI Spider] Initiating Push Protocol for ${urlList.length} URLs to IndexNow (Bing/ChatGPT)...`);

const req = https.request(options, (res) => {
  console.log(`📡 [Server Response Code]: ${res.statusCode}`);
  
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log("✅ [Success] Massive Sitemap + AI Data successfully pushed! AI engines will process the entire site now.");
  } else {
    console.log("⚠️ [Warning] Unexpected response from server.");
  }

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error("❌ [Error] Failed to connect to IndexNow servers:");
  console.error(error);
});

req.write(data);
req.end();
