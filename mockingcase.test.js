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

  test('Returned string should have same length as input string', () => {
    const input = 'hello world';
    const options = {
      random: true
    };
    expect(mOcKiNgCaSe(input)).toHaveLength(input.length);
    expect(mOcKiNgCaSe(input, options)).toHaveLength(input.length);
  });

  test('Should convert even index letters to uppercase and odd index letters to lowercase', () => {
    const input = 'hello world';
    const options = {
      firstUpper: true
    };
    const expectedOutput = 'HeLlO WoRlD';
    expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
  });

  test('Should only modify letters', () => {
    const input = '1234567890hello world!@#$%^&*()_+[]{},./<>?`~\\';
    const options = {
      firstUpper: true
    };
    const expectedOutput = '1234567890HeLlO WoRlD!@#$%^&*()_+[]{},./<>?`~\\';
    expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
  });

});
