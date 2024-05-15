const http = require('https');

const fetchMetadata = async function (url) {
  return new Promise((resolve, reject) => {
    try {
      const req = http.get(url, {
        headers: {
          'user-agent': 'Mnemo/1.0 (contact@mnemo.com)'
        }
      }, (res) => {
        if (res.statusCode === 302) {
          resolve(fetchMetadata(req.protocol + req.host + res.headers.location));
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      });
      req.on('error', (error) => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = fetchMetadata;
