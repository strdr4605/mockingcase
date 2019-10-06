/**
 * Converts the input string(s) to mockingcase.
 * @param {(string | string[])} input String(s) to be converted.
 * @param {object} [options={random: false,  onlyLetters: false}] Conversion options.
 * @param {boolean} options.random=false - If case conversion should be randomized.
 * @param {boolean} options.onlyLetters=false - If non letters characters should be removed.
 * @param {boolean} options.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE).
 * @param {(string | RegExp)} options.upper=null - matched RegExp guarenteed to be upper cased
 * @param {(string | RegExp)} options.lower=null - matched RegExp guarenteed to be lower cased
 * When combined with `options.random`, the first letter of the random string will be capitalized.
 * @returns {string} string in mockingcase
 */
function mockingcase(input = "", options) {
  options = Object.assign(
    {
      random: false,
      onlyLetters: false,
      firstUpper: false,
      upper: null,
      lower: null,
    },
    options,
  );

  // Combine strings first to form the input string.
  if (isArrayOfStrings(input)) {
    input = input.join("");
  }

  // Throw an error if an input is not given.
  if (input === "") {
    throw Error("An input is required");
  }

  // Filter out any characters which are not alphabetic or whitespace.
  if (options.onlyLetters) {
    input = input.replace(/[^a-zA-Z\s]/g, "");
  }

  if (options.random) {
    input = randomCase(input);
    // Ensure first character is upper case.
    if (options.firstUpper) {
      input = input[0].toUpperCase() + input.slice(1);
    }
  } else if (options.firstUpper) {
    input = convert(input, (str, i) => i % 2 === 0);
  } else {
    // Default to making the odd positioned characters upper case
    input = convert(input, (str, i) => i % 2 === 1);
  }

  if (options.lower) {
    input = convertToSpecificCase(input, options.lower, str => str.toLowerCase());
  }

  if (options.upper) {
    input = convertToSpecificCase(input, options.upper, str => str.toUpperCase());
  }

  return input;
}

/**
 * Outputs a message to the console in mockingcase.
 * @param {(string | string[])} input String(S) to be converted.
 * @param {object} [options={random: false}] Options for converting.
 * @param {boolean} options.random=false - If case conversion should be randomized.
 * @param {boolean} options.onlyLetters=false - If non letters characters should be removed.
 * @param {boolean} options.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE).
 * When combined with `options.random`, the first letter of the random string will be capitalized.
 */
mockingcase.log = (input, options) => console.log(mockingcase(input, options));

/**
 * Outputs a mockingcase with default options.
 * @param {object} defaultOptions Options for converting.
 * @param {boolean} defaultOptions.random=false - If case conversion should be randomized.
 * @param {boolean} defaultOptions.onlyLetters=false - If non letters characters should be removed.
 * @param {boolean} defaultOptions.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE). * @returns {string} string in mockingcase
 * @return mockingcase with default options
 */
mockingcase.config = defaultOptions => (input = "", overridedDefaultOptions) => {
  const options = Object.assign(defaultOptions || {}, overridedDefaultOptions || {});
  return mockingcase(input, options);
};

/**
 * Creates `String.prototype.toMockingCase()`.
 * @return mockingcase
 */
mockingcase.overrideString = () => {
  /**
   * Converts this string to mockingcase.
   * @param {object} [options={random: false}] Options for converting.
   * @param {boolean} options.random=false - If case conversion should be randomized.
   * @param {boolean} options.onlyLetters=false - If non letters characters should be removed.
   * @param {boolean} options.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE).
   * @param {(string | RegExp)} options.upper=null - matched RegExp guarenteed to be upper cased
   * @param {(string | RegExp)} options.lower=null - matched RegExp guarenteed to be lower cased
   * When combined with `options.random`, the first letter of the random string will be capitalized.
   * @returns {string} string in mockingcase
   * @see mockingcase
   */
  String.prototype.toMockingCase = function toMockingCase(options) {
    return mockingcase(this, options);
  };

  return mockingcase;
};

/**
 * Overrides console.log input to print the input mockingcase.
 * @param {object} [options={random: false}] Options for converting.
 * @param {boolean} options.random=false - If case conversion should be randomized.
 * @param {boolean} options.onlyLetters=false - If non letters characters should be removed.
 * @param {boolean} options.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE).
 * @param {(string | RegExp)} options.upper=null - matched RegExp guarenteed to be upper cased
 * @param {(string | RegExp)} options.lower=null - matched RegExp guarenteed to be lower cased
 * When combined with `options.random`, the first letter of the random string will be capitalized.
 * @returns {function} mockingcase function
 * @see mockingcase
 */
mockingcase.overrideConsole = (options = {}) => {
  const print = console.log;
  console.log = value => {
    print(mockingcase(value, options));
  };
  return mockingcase;
};

/**
 * @param {string|string[]} input The user-given input.
 * @return If the given input is an array of strings.
 */
function isArrayOfStrings(input) {
  if (!Array.isArray(input)) {
    return false;
  }

  input.forEach((value, i) => {
    if (typeof value !== "string") {
      throw TypeError(`Expected array of strings but got type '${typeof value}' at index ${i}`);
    }
  });

  return true;
}

/**
 * @param {string} input The string to convert.
 * @return The given string with random casings.
 */
function randomCase(input) {
  return convert(input, () => Math.round(Math.random()));
}

/**
 * Converts matched letters to a specified case
 * @param {string} input - string to convert
 * @param {(string | RegExp)} regex - use to match letters you want to convert
 * @param {function} caseReplacer - a function that changes the letter's case
 * @return {string} given input with match letters to the  case type determined
 */
function convertToSpecificCase(input, regex, caseReplacer) {
  if (typeof regex !== "string" && !(regex instanceof RegExp)) {
    throw TypeError(`Expected string or RegExp but got "${typeof regex}"`);
  }
  regex = new RegExp(regex, "gi");
  return input.replace(regex, caseReplacer);
}

/**
 * Converts the string.
 * @param {string} input The string to convert.
 * @param {function(string, number)} shouldLetterBeUpperCase A function given a character and its index,
 * which returns if the given letter should be set to uppercase. If false, the letter will be lowercase.
 * @return The converted string.
 */
function convert(input, shouldLetterBeUpperCase) {
  return input.replace(/./g, (str, i) => (shouldLetterBeUpperCase(str, i) ? str.toUpperCase() : str.toLowerCase()));
}

const mockingcase = mockingcase; // eslint-disable-line no-unused-vars

try {
  module.exports = mockingcase;
} catch (e) {} // eslint-disable-line no-empty



