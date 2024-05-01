require('dotenv').config();
const http = require('https');

const fetch = async function(params) {
  let { url , headers } = params;
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

async function handleAnalytics(req, res, next) {
  try {
    let { encoding } = req.params;
    try {
      let analyticsData = await fetch({
        url: `${process.env.ANALYTICS_API_URL}/analytics/${encoding}`,
        headers: {
          'x-api-key': process.env.ANALYTICS_API_KEY,
      }});
      res.status(200).json(analyticsData);
    } catch (e) {
      console.log(e);
      next({ code: 400, msg: 'Unable to fetch Analytics data', error: e });
    }
  } catch (e) {
    console.log(e);
    next({ error: e });
  }
}

module.exports = handleAnalytics;
