const mOcKiNgCaSe = require('./index');

describe('mockingcase', () => {
  test('Should convert even index letters to lowercase and odd index letters to uppercase', () => {
    const input = 'hello world';
    const expectedOutput = 'hElLo wOrLd';
    expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
  });

  test('Should only modify letters', () => {
    const input = '1234567890hello world!@#$%^&*()_+[]{},./<>?`~\\';
    const expectedOutput = '1234567890hElLo wOrLd!@#$%^&*()_+[]{},./<>?`~\\';
    expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
  });
});
