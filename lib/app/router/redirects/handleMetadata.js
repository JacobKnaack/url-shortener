'use strict';
const fetchMetadata = require('../../util/fetchMetadata');
const cheerio = require('cheerio');

const getTitle = (parser) => {
  const title = parser('title') || parser('h1') || parser('h2');
  if (title) {
    return title.text().trim();
  } else {
    return null;
  }
}

const getDescription = (parser) => {
  const description = parser('meta[name="description"]').attr('content') 
    || parser('p').text();
  if (description) {
    return description.trim();
  } else {
    return null;
  }
}

const getImage = (parser) => {
  const image = parser('meta[property="og:image"]').attr('content')
    || parser('img').attr('src');
  if (image) {
    return image.trim();
  } else {
    return null;
  }
}

async function handleMetadata(req, res, next) {
  try {
    const parseUrl = new URL(req.body.url);
    const html = await fetchMetadata(req.body.url);
    const result = { title: null, description: null, image: null };
    // Parse metadata
    if (html !== null) {
      const parser = cheerio.load(html);
      result.title = getTitle(parser) || parseUrl.hostname || 'Unknown title';
      result.description = getDescription(parser) || 'Unknown description';
      result.image = getImage(parser) || 'https://placehold.it/200x200';
    }
    res.status(200).send(result);
  } catch (e) {
    next({ msg: 'unable to retrieve metadata', code: 404, error: e});
  }
}

module.exports = handleMetadata;

