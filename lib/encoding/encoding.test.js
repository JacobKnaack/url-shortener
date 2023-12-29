const { createEncoding, decode } = require('./index.js');

describe('Encoding and decoding', () => {
  test('Should be able to encode a string', () => {
    let encodedString = createEncoding('A simple string');
    expect(encodedString).toBeTruthy();
  });

  xtest('Input String of sizeable length should be encoded into a smaller input', () => {
    let inputString = 'A long string with many characters';
    let encodedString = createEncoding(inputString);
    console.log('INPUT : ', inputString, 'ENCODED : ', encodedString);
    expect(encodedString.length < inputString.length).toBeTruthy();
  });
  xtest('Should substantially reduce the size of hash like string', () => {
    let inputString = '140b57848267519f1d5535ba7d48604f05dd26952bc8604fde9eb95cd2b88021';
    let encodedString = createEncoding(inputString);
    console.log('INPUT : ', inputString, 'ENCODED : ', encodedString);
    expect(encodedString.length < inputString.length).toBeTruthy();
  });
});