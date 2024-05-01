require('dotenv').config();
const fetch = require('../util/fetch');

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
    res.status(200).json(analyticsData);
  } catch (e) {
    console.log(e);
    next({ error: e });
  }
}

module.exports = handleBatchAnalytics;