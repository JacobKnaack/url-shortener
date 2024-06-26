require('dotenv').config();
const httpGet = require('../util/httpGet');

async function handleAnalytics(req, res, next) {
  try {
    let { record } = req;
    let analyticsData = await httpGet({
      url: `${process.env.ANALYTICS_API_URL}/analytics/${record.short}`,
      headers: {
        'x-api-key': process.env.ANALYTICS_API_KEY,
    }});
    res.status(200).json({ records: analyticsData });
  } catch (e) {
    console.log(e);
    next({ code: 400, msg: 'Unable to fetch Analytics data', error: e });
  }
}

module.exports = handleAnalytics;
