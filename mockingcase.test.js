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

  test('log should send converted string to console.log', () => {
    const input = 'hello world';
    const expectedOutput = mOcKiNgCaSe(input);
    let consoleOutput = null;

    console.log = jest.fn(output => {
      consoleOutput = output;
    });

    mOcKiNgCaSe.log(input);

    expect(consoleOutput).toEqual(expectedOutput);
  });

  test('If input is an array of string, it should return the mOcKiNgCaSe version of the string formed by the array\'s elements.', () => {
    const input = ['foo', 'bar'];
    const expectedOutput = 'fOoBaR';
    expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
  });
});
