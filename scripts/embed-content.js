// scripts/embed-content.js

const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_EMBEDDING_URL = 'https://api.openai.com/v1/embeddings';
const MODEL = 'text-embedding-ada-002';

// 1. Load content chunks (for demo, from a sample file)
const contentFile = path.join(__dirname, 'site-content.txt');
const content = fs.readFileSync(contentFile, 'utf-8');

// Split into chunks (paragraphs for demo)
const chunks = content.split(/\n\n+/).map((text, i) => ({ id: i, text: text.trim() })).filter(c => c.text.length > 0);

async function embed(text) {
  const res = await fetch(OPENAI_EMBEDDING_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: text, model: MODEL })
  });
  if (!res.ok) throw new Error(`Embedding failed: ${res.status}`);
  const data = await res.json();
  return data.data[0].embedding;
}

(async () => {
  const results = [];
  for (const chunk of chunks) {
    console.log(`Embedding chunk ${chunk.id}...`);
    const embedding = await embed(chunk.text);
    results.push({ id: chunk.id, text: chunk.text, embedding });
  }
  fs.writeFileSync(path.join(__dirname, 'content-embeddings.json'), JSON.stringify(results, null, 2));
  console.log('Embeddings saved to content-embeddings.json');
})(); 