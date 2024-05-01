require('dotenv').config;
const { http, HttpResponse } = require('msw');

const ANALYTICS_API_URL = process.env.ANALYTICS_API_URL;

exports.handlers = [
  http.get(`${ANALYTICS_API_URL}/*`, () => {
    return HttpResponse.json([
      {
        "referrer": "Test referrer",
        "request_method": "Test method",
        "user_agent": "MOCK USER AGENT",
        "ip_address": "Test address",
        "timestamp": "Test timestamp",
        "link_encoding": "123456",
        "id": "3e4baf97-45a6-4a98-8e62-e66254fcbd8e",
        "response_code": "Test code"
      }
    ])
  }),
]