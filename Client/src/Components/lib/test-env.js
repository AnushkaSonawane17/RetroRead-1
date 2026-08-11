// api/test-env.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from root
dotenv.config({ path: resolve(__dirname, '../.env.local') });

console.log('🔑 API Key:', process.env.VITE_GOOGLE_BOOKS_API_KEY || '❌ Not found');