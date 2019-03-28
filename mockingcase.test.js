const mOcKiNgCaSe = require('./index').overrideString();

describe('mockingcase', () => {
  describe('input as string', () => {
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

  describe(`"Random" conversion option enabled`, () => {
    const input = 'hello world';
    const options = {
      random: true
    };
    const normalOutput = mOcKiNgCaSe(input);
    const randomlyConvertedOutput = mOcKiNgCaSe(input, options);

    test('Returned string should equal input string when ignoring case', () => {
      expect(normalOutput.toLowerCase()).toStrictEqual(randomlyConvertedOutput.toLowerCase());
    });

    test(`"First upper" option will capitalize the first letter`, () => {
      const options = {
        random: true,
        firstUpper: true
      };
      // Generate 100 random strings and ensure all have an uppercase first letter.
      for (let i = 0; i < 100; i++) {
        const output = mOcKiNgCaSe(input, options);
        expect(output[0]).toStrictEqual(output[0].toUpperCase());
      }
    });
  });

  describe(`"First upper" option enabled`, () => {
    const input = 'hello world';
    const options = {
      firstUpper: true
    };
    const output = mOcKiNgCaSe(input, options);
    const expectedOutput = 'HeLlO WoRlD';

    test('Should convert every other letter to uppercase, starting with the first letter', () => {
      expect(output).toStrictEqual(expectedOutput);
    });
  });

  describe('empty input', () => {
    test("If the input is left blank, an error should be thrown", () => {
      const input = "";
      const expectedOutput = undefined;
      expect(() => mOcKiNgCaSe(input).toThrow());
    });
  });

  describe('input as array', () => {
    test('If input is an array of strings, it should return the mOcKiNgCaSe version of the string formed by the array elements.', () => {
      const input = ['foo', 'bar'];
      const expectedOutput = 'fOoBaR';
      expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
    });

    test('If input is an array but all elements aren\'t strings, it should throw an error.', () => {
      const input = ['foo', '1', 1];
      expect(() => mOcKiNgCaSe(input)).toThrow();
    });
  });

  describe('#log', () => {
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
  });

  describe('toMockingCase', () => {
    test('Properly converts a string to mocking case', () => {
      const input = 'hello world';
      const expectedOutput = mOcKiNgCaSe(input);
      expect(input.toMockingCase()).toEqual(expectedOutput);
    });

    test("If the string is left blank, an error should be thrown", () => {
      const input = "";
      expect(() => input.toMockingCase().toThrow());
    });
  });

  describe('input with non-letter characters', () => {
    test('string with number characters', () => {
      const input = 'hello world123';
      const options = {
        onlyLetters: true
      };
      const expectedOutput = 'hElLo wOrLd';
      expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
    });

    test('string with symbols', () => {
      const input = 'hello$%@# %world@';
      const options = {
        onlyLetters: true
      };
      const expectedOutput = 'hElLo wOrLd';
      expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
    });
  });


});
