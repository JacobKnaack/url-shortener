
class Middleware {
  constructor() {
    this.request = {
      headers: {},
      method: '',
      body: {},
      params: {},
      query: {}
    },
    this.response = {
      send: jest.fn(() => this.response),
      json: jest.fn(() => this.response),
      status: jest.fn(() => this.response)
    }
    this.next = jest.fn()
  }
  setRequest = (path, value) => {
    let current = this.request;
    let edges = path.split('.');
    let edge = null;
    for (let index in edges) {
      edge = edges[index];
      if (current[edge]) {
        current = current[edge];
      } else {
        break;
      }
    }
    current[edge] = value;
  }
}

module.exports = Middleware;
