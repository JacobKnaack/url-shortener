require('dotenv').config();
const fetch = require('../util/fetch');

function flattenArray(arr) {
  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
}

async function handleBatchAnalytics(req, res, next) {
  try {
    const { links } = req.records;
    let analyticsData = await Promise.all(
      links.map(record => fetch({
        url: `${process.env.ANALYTICS_API_URL}/analytics/${record.short}`,
        headers: {
          'x-api-key': process.env.ANALYTICS_API_KEY
        }
      }))
    );
    const responseData = {
      records: {
        links,
        traffic: flattenArray(analyticsData)
      }
    }
    res.status(200).json(responseData);
  } catch (e) {
    console.log(e);
    next({ error: e });
  }
}

module.exports = handleBatchAnalytics;