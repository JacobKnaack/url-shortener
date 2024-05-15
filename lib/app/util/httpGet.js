const http = require('https');

const httpGet = async function (params) {
  let { url, headers } = params;
  return new Promise((resolve, reject) => {
    try {
      const req = http.get(url, { headers }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (headers['Accept'] === 'text/html') {
            resolve(data);
          } else {
            resolve(JSON.parse(data));
          }
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

module.exports = httpGet;