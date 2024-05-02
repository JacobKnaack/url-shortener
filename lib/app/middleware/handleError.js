function handleError(err, req, res, next) {
  const { msg, code, error } = err;
  if (error && msg) {
    error.message = msg;
  }
  res.status(code || 500);
  res.setHeader('Content-Type', 'application/json');
  res.json(error || { message: msg });
}

module.exports = handleError;
