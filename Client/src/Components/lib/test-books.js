// api/test-books.js
import { testAPI } from './googleBooks.js';

console.log('🧪 Starting Google Books API test...\n');
testAPI().then(() => {
  console.log('\n✅ Test complete!');
}).catch((err) => {
  console.error('\n❌ Test failed:', err);
});