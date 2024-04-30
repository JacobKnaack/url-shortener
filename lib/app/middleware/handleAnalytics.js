
async function handleAnalytics(req, res, next) {
  try {
    res.send('Fetching analytics');
  } catch (e) {
    next({ error: e });
  }
}

module.exports = handleAnalytics;
