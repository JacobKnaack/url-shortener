const http = require('https');

const fetch = async function (params) {
  let { url, headers } = params;
  return new Promise((resolve, reject) => {
    const req = http.get(url, { headers }, (res) => {
      let data = '';
      try {
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = fetch;