/**
 * @jest-environment node
 */
/* eslint-disable no-shadow */
/* eslint-disable global-require */
const mockingcase = require("./index").overrideString();

describe("mockingcase", () => {
  describe("input as string", () => {
    test("Should convert even index letters to lowercase and odd index letters to uppercase", () => {
      const input = "hello world";
      const expectedOutput = "hElLo wOrLd";
      expect(mockingcase(input)).toEqual(expectedOutput);
    });

    test("Should only modify letters", () => {
      const input = "1234567890hello world!@#$%^&*()_+[]{},./<>?`~\\";
      const expectedOutput = "1234567890hElLo wOrLd!@#$%^&*()_+[]{},./<>?`~\\";
      expect(mockingcase(input)).toEqual(expectedOutput);
    });
  });

  describe(`"Random" conversion option enabled`, () => {
    const input = "hello world";
    const options = {
      random: true,
    };
    const normalOutput = mockingcase(input);
    const randomlyConvertedOutput = mockingcase(input, options);

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
        const output = mockingcase(input, options);
        expect(output[0]).toStrictEqual(output[0].toUpperCase());
      }
    });
  });

  describe(`"First upper" option enabled`, () => {
    const input = "hello world";
    const options = {
      firstUpper: true,
    };
    const output = mockingcase(input, options);
    const expectedOutput = "HeLlO WoRlD";

    test("Should convert every other letter to uppercase, starting with the first letter", () => {
      expect(output).toStrictEqual(expectedOutput);
    });
  });

  describe("empty input", () => {
    test("If the input is left blank, an error should be thrown", () => {
      const input = "";
      expect(() => mockingcase(input)).toThrowError(new Error("An input is required"));
    });
  });

  describe("input as array", () => {
    test("If input is an array of strings, it should return the mockingcase version of the string formed by the array elements.", () => {
      const input = ["foo", "bar"];
      const expectedOutput = "fOoBaR";
      expect(mockingcase(input)).toEqual(expectedOutput);
    });

    test("If input is an array but all elements aren't strings, it should throw an error.", () => {
      const input = ["foo", "1", 1];
      expect(() => mockingcase(input)).toThrow();
    });
  });

  describe("#log", () => {
    test("log should send converted string to console.log", () => {
      const input = "hello world";
      const expectedOutput = mockingcase(input);
      let consoleOutput = null;

      console.log = jest.fn(output => {
        consoleOutput = output;
      });
      mockingcase.log(input);

      expect(consoleOutput).toEqual(expectedOutput);
    });
  });

  describe("toMockingCase", () => {
    test("Properly converts a string to mocking case", () => {
      const input = "hello world";
      const expectedOutput = mockingcase(input);
      expect(input.toMockingCase()).toEqual(expectedOutput);
    });

    test("Does not ignore options", () => {
      const input = "hello world";
      const options = {
        firstUpper: true,
      };
      const expectedOutput = mockingcase(input, options);
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
      expect(mockingcase(input, options)).toEqual(expectedOutput);
    });

    test("string with symbols", () => {
      const input = "hello$%@# %world@";
      const options = {
        onlyLetters: true,
      };
      const expectedOutput = "hElLo wOrLd";
      expect(mockingcase(input, options)).toEqual(expectedOutput);
    });
  });

  describe("default options when importing/requiring package", () => {
    test("default options", () => {
      const mockingcase = require("./index").config({
        onlyLetters: true,
      });
      const input = "hello123";
      const expectedOutput = "hElLo";
      expect(mockingcase(input)).toEqual(expectedOutput);
    });

    test("NO default options", () => {
      const mockingcase = require("./index").config();
      const input = "hello123";
      const expectedOutput = "hElLo123";
      expect(mockingcase(input)).toEqual(expectedOutput);
    });

    test("override default options", () => {
      const mockingcase = require("./index").config({
        onlyLetters: true,
      });
      const input = "hello123";
      const options = {
        onlyLetters: false,
      };
      const expectedOutput = "hElLo123";
      expect(mockingcase(input, options)).toEqual(expectedOutput);
    });

    test("overriding default options should keep unaffected defaults", () => {
      const mockingcase = require("./index").config({
        onlyLetters: true,
        firstUpper: true,
      });
      const input = "hello123";
      const options = {
        onlyLetters: false,
      };
      const expectedOutput = "HeLlO123";
      expect(mockingcase(input, options)).toEqual(expectedOutput);
    });
  });

  describe("default input", () => {
    test("If the input is undefined, an error should be thrown", () => {
      const input = undefined;
      expect(() => mockingcase(input)).toThrow(new Error("An input is required"));
    });

    test("For config option if the input is undefined, an error should be thrown", () => {
      const mockingcase = require("./index").config({
        onlyLetters: true,
      });
      const input = undefined;
      const options = {
        onlyLetters: false,
      };
      expect(() => mockingcase(input, options)).toThrow(new Error("An input is required"));
    });
  });

  describe("overrideConsole", () => {
    test("console.log always prints the mockingcase", () => {
      const input = "hello world";
      const expectedOutput = mockingcase(input);
      let consoleOutput = null;
      console.log = jest.fn(output => {
        consoleOutput = output;
      });
      mockingcase.overrideConsole();
      console.log(input);
      expect(consoleOutput).toEqual(expectedOutput);
    });
    test("overrideConsole can also be implemented while requiring", () => {
      const input = "hello world";
      const mockingcase = require("./index").overrideConsole();
      const expectedOutput = mockingcase(input);
      let consoleOutput = null;
      console.log = jest.fn(output => {
        consoleOutput = output;
      });
      mockingcase.overrideConsole();
      console.log(input);
      expect(consoleOutput).toEqual(expectedOutput);
    });
  });

  describe(`option.upper | set as String`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("Should make match substring upper case", () => {
      const expectedOutput = "hElLo WORLd";
      const options = {
        upper: "worl",
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should make matched letters upper case", () => {
      const expectedOutput = "hELLO WORLd";
      const options = {
        upper: "[lwro]",
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      const options = {
        upper: "ohd",
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });

  describe(`option.upper | set as RegExp`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("Should guarantee matched substring is upper case", () => {
      const expectedOutput = "hElLo WORLd";
      const options = {
        upper: /worl/,
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should guarantee all matched letters are upper case", () => {
      const expectedOutput = "hELLO WORLd";
      const options = {
        upper: /[lwro]/,
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      const options = {
        upper: /ohd/,
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });

  describe(`option.upper | set as invalid type`, () => {
    test("Should throw Error if set as number", () => {
      const options = {
        upper: 312313,
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
    test("Should throw Error if set as boolean", () => {
      const options = {
        upper: true,
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
    test("Should throw Error if set as array", () => {
      const options = {
        upper: ["a", "s", "g"],
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
    test("Should throw Error if set as dict", () => {
      const options = {
        upper: { first: "a", second: "b" },
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
  });

  describe(`option.lower | set as String`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("Should make match substring lower case", () => {
      const expectedOutput = "hElLo world";
      const options = {
        lower: "WORL",
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should make matched letters lower case", () => {
      const expectedOutput = "hEllo world";
      const options = {
        lower: "[LWRO]",
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      const options = {
        lower: "ohd",
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });

  describe(`option.lower | set as RegExp`, () => {
    const lowerCaseInput = "hello world";
    const capitalizeInput = "Hello World";
    const upperCaseInput = "HELLO WORLD";

    test("Should guarantee matched substring is lower case", () => {
      const expectedOutput = "hElLo world";
      const options = {
        lower: /WORL/,
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should guarantee all matched letters are lower case", () => {
      const expectedOutput = "helLo worLd";
      const options = {
        lower: /[OE]/,
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });

    test("Should keep string as default since substring does not match", () => {
      const expectedOutput = "hElLo wOrLd";
      const options = {
        lower: /ohd/,
      };
      let resultOutput = mockingcase(lowerCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(capitalizeInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
      resultOutput = mockingcase(upperCaseInput, options);
      expect(resultOutput).toStrictEqual(expectedOutput);
    });
  });

  describe(`option.lower | set as invalid type`, () => {
    test("Should throw Error if set as number", () => {
      const options = {
        lower: 312313,
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
    test("Should throw Error if set as boolean", () => {
      const options = {
        lower: true,
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
    test("Should throw Error if set as array", () => {
      const options = {
        lower: ["a", "s", "g"],
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
    test("Should throw Error if set as dict", () => {
      const options = {
        lower: { first: "a", second: "b" },
      };
      const invalidCall = mockingcase.bind(null, "hello world", options);
      expect(invalidCall).toThrow();
    });
  });
});



