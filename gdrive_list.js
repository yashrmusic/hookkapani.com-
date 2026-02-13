const https = require('https');

const folderId = '1dr5CPPGEX0coMuj-muallEIgdZ9Mq0IY';
const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Try to find file IDs and names
    const idMatches = data.match(/data-id="([^"]+)"/g) || [];
    const ids = idMatches.map(m => m.match(/data-id="([^"]+)"/)[1]);
    
    // Try alternate patterns
    const entryMatches = data.match(/entry-title[^>]*>([^<]+)/g) || [];
    const names = entryMatches.map(m => m.replace(/entry-title[^>]*>/, ''));
    
    // Try to find any file references
    const fileLinks = data.match(/\/file\/d\/([^/"]+)/g) || [];
    const uniqueLinks = [...new Set(fileLinks)];
    
    console.log('IDs found:', ids.length, ids);
    console.log('Names found:', names.length, names);
    console.log('File links found:', uniqueLinks.length, uniqueLinks);
    
    // Also dump a portion of the HTML to understand structure
    if (ids.length === 0 && names.length === 0 && uniqueLinks.length === 0) {
      // Try broader pattern matching
      const allIds = data.match(/[a-zA-Z0-9_-]{25,}/g) || [];
      const filtered = [...new Set(allIds)].slice(0, 30);
      console.log('\nPotential IDs:', filtered);
      
      // Show small snippet
      const snippet = data.substring(0, 3000);
      console.log('\n--- HTML SNIPPET ---');
      console.log(snippet);
    }
  });
});
