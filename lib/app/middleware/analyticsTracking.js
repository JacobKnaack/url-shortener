const { webTraffic } = require('../../events');

function analyticsTracking(req, res, next) {
  const end = res.end;
  res.end = function(data, encoding, callback) {
    const link_encoding = req.params.encoding || 'unknown';
    const user_agent = req.headers["user-agent"] || 'unknown';
    const ip_address = req.ip || req.connection.remoteAccess;
    const timestamp = Date.now();
    const request_method = req.method;
    const referrer = req.get('Referrer') || req.headers.referer || req.headers.referrer || 'unknown';
    const response_code = res.statusCode;

    const notification = { user_agent, ip_address, timestamp, request_method, response_code, referrer, encoding: link_encoding }
    // notify the traffic service that a new request has been made.

    webTraffic(notification);
    end.call(this, data, encoding, callback);
  }
  next();
}

module.exports = analyticsTracking;
