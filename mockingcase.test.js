/**
 * @jest-environment node
 */
/* eslint-disable no-shadow */
/* eslint-disable global-require */
const mOcKiNgCaSe = require("./index").overrideString();

describe("mockingcase", () => {
  describe("input as string", () => {
    test("Should convert even index letters to lowercase and odd index letters to uppercase", () => {
      const input = "hello world";
      const expectedOutput = "hElLo wOrLd";
      expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
    });

    test("Should only modify letters", () => {
      const input = "1234567890hello world!@#$%^&*()_+[]{},./<>?`~\\";
      const expectedOutput = "1234567890hElLo wOrLd!@#$%^&*()_+[]{},./<>?`~\\";
      expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
    });
  });

  describe(`"Random" conversion option enabled`, () => {
    const input = "hello world";
    const options = {
      random: true,
    };
    const normalOutput = mOcKiNgCaSe(input);
    const randomlyConvertedOutput = mOcKiNgCaSe(input, options);

    test("Returned string should equal input string when ignoring case", () => {
      expect(normalOutput.toLowerCase()).toStrictEqual(randomlyConvertedOutput.toLowerCase());
    });

    test(`"First upper" option will capitalize the first letter`, () => {
      const options = {
        random: true,
        firstUpper: true,
      };
      // Generate 100 random strings and ensure all have an uppercase first letter.
      for (let i = 0; i < 100; i++) {
        const output = mOcKiNgCaSe(input, options);
        expect(output[0]).toStrictEqual(output[0].toUpperCase());
      }
    });
  });

  describe(`"First upper" option enabled`, () => {
    const input = "hello world";
    const options = {
      firstUpper: true,
    };
    const output = mOcKiNgCaSe(input, options);
    const expectedOutput = "HeLlO WoRlD";

    test("Should convert every other letter to uppercase, starting with the first letter", () => {
      expect(output).toStrictEqual(expectedOutput);
    });
  });

  describe("empty input", () => {
    test("If the input is left blank, an error should be thrown", () => {
      const input = "";
      expect(() => mOcKiNgCaSe(input)).toThrowError(new Error("An input is required"));
    });
  });

  describe("input as array", () => {
    test("If input is an array of strings, it should return the mOcKiNgCaSe version of the string formed by the array elements.", () => {
      const input = ["foo", "bar"];
      const expectedOutput = "fOoBaR";
      expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
    });

    test("If input is an array but all elements aren't strings, it should throw an error.", () => {
      const input = ["foo", "1", 1];
      expect(() => mOcKiNgCaSe(input)).toThrow();
    });
  });

  describe("#log", () => {
    test("log should send converted string to console.log", () => {
      const input = "hello world";
      const expectedOutput = mOcKiNgCaSe(input);
      let consoleOutput = null;

      console.log = jest.fn(output => {
        consoleOutput = output;
      });
      mOcKiNgCaSe.log(input);

      expect(consoleOutput).toEqual(expectedOutput);
    });
  });

  describe("toMockingCase", () => {
    test("Properly converts a string to mocking case", () => {
      const input = "hello world";
      const expectedOutput = mOcKiNgCaSe(input);
      expect(input.toMockingCase()).toEqual(expectedOutput);
    });

    test("Does not ignore options", () => {
      const input = "hello world";
      const options = {
        firstUpper: true,
      };
      const expectedOutput = mOcKiNgCaSe(input, options);
      expect(input.toMockingCase(options)).toMatch(expectedOutput);
    });

    test("If the string is left blank, an error should be thrown", () => {
      const input = "";
      expect(() => input.toMockingCase().toThrow());
    });
  });

  describe("input with non-letter characters", () => {
    test("string with number characters", () => {
      const input = "hello world123";
      const options = {
        onlyLetters: true,
      };
      const expectedOutput = "hElLo wOrLd";
      expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
    });

    test("string with symbols", () => {
      const input = "hello$%@# %world@";
      const options = {
        onlyLetters: true,
      };
      const expectedOutput = "hElLo wOrLd";
      expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
    });
  });

  describe("default options when importing/requiring package", () => {
    test("default options", () => {
      const mOcKiNgCaSe = require("./index").config({
        onlyLetters: true,
      });
      const input = "hello123";
      const expectedOutput = "hElLo";
      expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
    });

    test("NO default options", () => {
      const mOcKiNgCaSe = require("./index").config();
      const input = "hello123";
      const expectedOutput = "hElLo123";
      expect(mOcKiNgCaSe(input)).toEqual(expectedOutput);
    });

    test("override default options", () => {
      const mOcKiNgCaSe = require("./index").config({
        onlyLetters: true,
      });
      const input = "hello123";
      const options = {
        onlyLetters: false,
      };
      const expectedOutput = "hElLo123";
      expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
    });

    test("overriding default options should keep unaffected defaults", () => {
      const mOcKiNgCaSe = require("./index").config({
        onlyLetters: true,
        firstUpper: true,
      });
      const input = "hello123";
      const options = {
        onlyLetters: false,
      };
      const expectedOutput = "HeLlO123";
      expect(mOcKiNgCaSe(input, options)).toEqual(expectedOutput);
    });
  });

  describe("default input", () => {
    test("If the input is undefined, an error should be thrown", () => {
      const input = undefined;
      expect(() => mOcKiNgCaSe(input)).toThrow(new Error("An input is required"));
    });

    test("For config option if the input is undefined, an error should be thrown", () => {
      const mOcKiNgCaSe = require("./index").config({
        onlyLetters: true,
      });
      const input = undefined;
      const options = {
        onlyLetters: false,
      };
      expect(() => mOcKiNgCaSe(input, options)).toThrow(new Error("An input is required"));
    });
  });

  describe("overrideConsole", () => {
    test("console.log always prints the mOcKiNgCaSe", () => {
      const input = "hello world";
      const expectedOutput = mOcKiNgCaSe(input);
      let consoleOutput = null;
      console.log = jest.fn(output => {
        consoleOutput = output;
      });
      mOcKiNgCaSe.overrideConsole();
      console.log(input);
      expect(consoleOutput).toEqual(expectedOutput);
    });
    test("overrideConsole can also be implemented while requiring", () => {
      const input = "hello world";
      const mOcKiNgCaSe = require("./index").overrideConsole();
      const expectedOutput = mOcKiNgCaSe(input);
      let consoleOutput = null;
      console.log = jest.fn(output => {
        consoleOutput = output;
      });
      mOcKiNgCaSe.overrideConsole();
      console.log(input);
      expect(consoleOutput).toEqual(expectedOutput);
    });
  });

  describe(`option.upper | set as String`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("it should make match substring upper case", () => {
      const expectedOutput = "hElLo WORLd";
      let options = {
        upper: "worl"
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should make matched letters upper case", () => {
      const expectedOutput = "hELLO WORLd";
      let options = {
        upper: "[lwro]"
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      let options = {
        upper: "ohd"
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });

  describe(`option.upper | set as RegExp`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("it should guarantee matched substring is upper case", () => {
      const expectedOutput = "hElLo WORLd";
      let options = {
        upper: /worl/
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should guarantee all matched letters are upper case", () => {
      const expectedOutput = "hELLO WORLd";
      let options = {
        upper: /[lwro]/
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      let options = {
        upper: /ohd/
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });

  describe(`option.lower | set as String`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("it should make match substring lower case", () => {
      const expectedOutput = "hElLo world";
      let options = {
        lower: "WORL"
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should make matched letters lower case", () => {
      const expectedOutput = "hEllo world";
      let options = {
        lower: "[LWRO]"
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      let options = {
        lower: "ohd"
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });

  describe(`option.lower | set as RegExp`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("it should guarantee matched substring is lower case", () => {
      const expectedOutput = "hElLo world";
      let options = {
        lower: /WORL/
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should guarantee all matched letters are lower case", () => {
      const expectedOutput = "helLo worLd";
      let options = {
        lower: /[OE]/
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("it should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      let options = {
        lower: /ohd/
      };
      let resultOutput = mOcKiNgCaSe(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mOcKiNgCaSe(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });
});
