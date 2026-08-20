import https from 'https';

const data = JSON.stringify({
  "host": "medestra.me",
  "key": "medestra-ai-indexnow-key-2026",
  "keyLocation": "https://medestra.me/medestra-ai-indexnow-key-2026.txt",
  "urlList": [
    "https://medestra.me/ai-feed.json",
    "https://medestra.me/ai-glossary.json",
    "https://medestra.me/ai-faq.json",
    "https://medestra.me/llms.txt",
    "https://medestra.me/"
  ]
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

console.log("🚀 [Medestra AI Spider] Initiating Push Protocol to IndexNow (Bing/ChatGPT)...");

const req = https.request(options, (res) => {
  console.log(`📡 [Server Response Code]: ${res.statusCode}`);
  
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log("✅ [Success] URLs successfully pushed to IndexNow servers! AI engines will now process the new data.");
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
