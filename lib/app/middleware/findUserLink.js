const { Link } = require('../../model');

async function findUserLink(req, res, next) {
  console.log(req);
  try {
    let record = await Link.getOne({ short: req.params.encoding, user_id: req.user.sub });
    if (req.records) {
      req.records.links = [record] 
    } else {
      req.records = { links: [record] };
    }
    next();
  } catch (e) {
    console.log('Something went wrong fetching user link records', e);
    next({ error: e });
  }
}

module.exports = findUserLink;
