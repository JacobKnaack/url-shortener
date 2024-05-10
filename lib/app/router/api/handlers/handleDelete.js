'use strict';

const handleDelete = (model) => async (req, res, next) => {
  try {
    await model.delete({ _id: req.params.id });
    console.log(`removed ${req.path}`);
    res.status(204).send();
  } catch (e) {
    next({ code: 500, msg: `Unable to /DELETE ${req.path}`});
  }
}

module.exports = handleDelete;