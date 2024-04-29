const { createEncoding, decode } = require('./index.js');

describe('Encoding and decoding', () => {
  test('Should be able to encode a string', () => {
    let encodedString = createEncoding('A simple string');
    expect(encodedString).toBeTruthy();
  });
  test('should be able to decode the encoded string', () => {
    let encodedString = createEncoding('TEST STRING');
    let decodedString = decode(encodedString);
    expect(decodedString).toEqual('TEST STRING');
  });
});