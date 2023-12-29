const { getHash, isUrl } = require('./index.js');

beforeAll(() => {
  jest.spyOn(console, 'log');
});
afterAll(() => {
  jest.clearAllMocks();
});

describe('URL hashing', () => {
  test('Should be able to hash strings', async () => {
    let hash = await getHash('https://test.com');
    expect(hash).toBeTruthy();
  });

  test('Should be able to validate http urls', () => {
    let bool = isUrl('this should fail');
    expect(bool).toBe(false);
    bool = isUrl('http://test.com');
    expect(bool).toBe(true);
    bool = isUrl('http:/test.com');
    expect(bool).toBe(false);
  });
});
