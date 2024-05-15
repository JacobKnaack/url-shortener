const { Link, Alias } = require('../../model');

const isEncoding = (string) => {
  return string.match(new RegExp(/^[0-9a-zA-Z]{10}$/ig));
}

async function handleEncoding(req, res, next) {
  let { encoding } = req.params || req.body;
  const searchParams = {};
  try {
    if (isEncoding(encoding)) {
      searchParams.short = encoding;
    } else {
      const alias = await Alias.getOne({ text: encoding });
      searchParams._id = alias.link_id;
    }
    let record = await Link.getOne(searchParams);
    req.record = record;
    next();
  } catch (e) {
    next({ msg: 'no link found', code: 404, error: e });
  }
}

module.exports = handleEncoding;