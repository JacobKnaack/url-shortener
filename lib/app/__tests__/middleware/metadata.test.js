'use strict';
const handleMetadata = require('../../router/redirects/handleMetadata');
const MiddlewareParams = require('http/MiddlewareParams');

describe('Metadata Handler', () => {
  test('Should return an object with title, description, and image', async () => {
    let { request, response, next } = new MiddlewareParams;
    request.body = {
      url: 'https://www.google.com',
    }
    await handleMetadata(request, response, next);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith({
      title: expect.any(String),
      description: expect.any(String),
      image: expect.any(String)
    });
    expect(next).not.toHaveBeenCalled();
  });
  test('Should find metadata for links from reddit', async () => {
    let { request, response, next } = new MiddlewareParams;
    request.body = {
      url: 'https://www.reddit.com/r/hygiene/comments/1cr3r2x/i_cant_take_this_shit_anymore_rant/',
    }
    await handleMetadata(request, response, next);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith({
      title: expect.any(String),
      description: expect.any(String),
      image: expect.any(String)
    });
    expect(next).not.toHaveBeenCalled();
  });
  test('Should find metadata for links from twitter', async () => {
    let { request, response, next } = new MiddlewareParams;
    request.body = {
      url: 'https://twitter.com/WhatsTrending/status/1100472289282351104',
    }
    await handleMetadata(request, response, next);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith({
      title: expect.any(String),
      description: expect.any(String),
      image: expect.any(String)
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('Should respond with a 404 when an invalid url is given', async () => {
    let { request, response, next } = new MiddlewareParams;
    request.body = {
      url: 'not-a-url',
    }

    await handleMetadata(request, response, next);
    expect(next).toHaveBeenCalledWith({
      code: 404,
      msg: 'unable to retrieve metadata',
      error: expect.anything()
    });
  });
});
