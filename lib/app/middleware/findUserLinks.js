const { Link } = require('../../model');

async function findUserLinks(req, res, next) {
  try {
    let records = await Link.getAll({
      user_id: req.user.sub
    });
    let payload = records ? records : [];
    if (req.records) {
      req.records.links = payload 
    } else {
      req.records = { links: payload };
    }
    next();
  } catch (e) {
    console.log('Something went wrong fetching user link records', e);
    next({ error: e });
  }
}

module.exports = findUserLinks;
