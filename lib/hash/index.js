'use strict';

const { createHash } = require('node:crypto');

function hashText(text, handleString) {
  const hash = createHash('sha256');
  try {
    hash.on('readable', () => {
      const data = hash.read();
        if (data) {
          handleString(data.toString('hex'));
        }
    });
    
    hash.write(text);
    hash.end();
  } catch (e) {
    console.log(e);
    throw new Error({ Message: 'Error hashing URL string: ', Error: e });
  }
}

function getHash(string) {
  return new Promise((resolve, reject) => {
    try {
      hashText(string, (hash) => {
        resolve(hash);
      });
    } catch (e) {
      reject(e);
    }
  });
}

function isUrl(string) {
  try{
    let regex = new RegExp(/^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/ig);
    const matches = string.match(regex);
    return Boolean(matches);  
  } catch (e) {
    throw new Error('Invalid Url');
  }
}

module.exports = {
  hashText,
  getHash,
  isUrl
};