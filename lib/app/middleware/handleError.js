function handleError(err, req, res, next) {
  const { msg, code, error } = err;
  
  res.status(code || 500);
  res.send(msg || 'Server Error');
  res.setHeader('Content-Type', 'application/json');
  res.json(error);
}

module.exports = handleError;
