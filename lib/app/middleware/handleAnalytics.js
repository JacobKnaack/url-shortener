require('dotenv').config();
const fetch = require('../util/fetch');

async function handleAnalytics(req, res, next) {
  try {
    let { encoding } = req.params;
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
}

module.exports = handleAnalytics;
