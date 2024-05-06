'use strict';

const handlePost = (model) => async (req, res, next) => {
  let { sub } = req.user;
  let recordValues = req.body;
  try {
    if (sub) {
      recordValues.user_id = sub;
    }
    let record = await model.create(recordValues);
    res.json(record.toObject({ virtuals: true }));
  } catch (e) {
    console.log(e);
    next({ code: 400, error: e, msg: `unable to POST ${req.path}` });
  }
}

module.exports = handlePost;