/**
 * Options for mockingcase.
 * @typedef {Object} Options
 * @property {boolean} [random=false] - If case conversion should be randomized.
 * @property {boolean} [onlyLetters=false] - If non letters characters should be removed.
 * @property {boolean} [firstUpper=false] - If the first letter should be capitalized
 * instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE).
 * When combined with options.random, the first letter of the random string will be capitalized.
 * @property {(string | RegExp)} [upper=null] - Characters or substring set to change to uppercase,
 * `upper` has higher priority that `lower`.
 * @property {(string | RegExp)} [lower=null] - Characters or substring set to change to lowercase.
 */

/**
 * Converts the input string(s) to mOcKiNgCaSe.
 * @param {(string | string[])} input - String(s) to be converted.
 * @param {Options} [options={random: false, onlyLetters: false, firstUpper: false, upper: null, lower: null}] - Conversion options.
 * @returns {string} string in mOcKiNgCaSe.
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
    input = convert(input, (_str, i) => i % 2 === 0);
  } else {
    // Default to making the odd positioned characters upper case
    input = convert(input, (_str, i) => i % 2 === 1);
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
 * Outputs a message to the console in mOcKiNgCaSe.
 * @param {(string | string[])} input - String(S) to be converted.
 * @param {Options} [options={random: false, onlyLetters: false, firstUpper: false, upper: null, lower: null}] - Conversion options.
 */
mockingcase.log = (input, options) => console.log(mockingcase(input, options));

/**
 * Outputs a mockingcase with default options.
 * @param {Options} [defaultOptions={random: false, onlyLetters: false, firstUpper: false, upper: null, lower: null}] - Conversion options.
 * @returns mockingcase with default options
 */
mockingcase.config = defaultOptions => (input = "", overridedDefaultOptions) => {
  const options = Object.assign(defaultOptions || {}, overridedDefaultOptions || {});
  return mockingcase(input, options);
};

/**
 * Creates `String.prototype.toMockingCase()`.
 * @returns mockingcase
 */
mockingcase.overrideString = () => {
  /**
   * Converts this string to mOcKiNgCaSe.
   * @param {Options} [options={random: false, onlyLetters: false, firstUpper: false, upper: null, lower: null}] Conversion options.
   * @returns {string} The string in mOcKiNgCaSe
   * @see mockingcase
   */
  String.prototype.toMockingCase = function toMockingCase(options) {
    return mockingcase(this, options);
  };

  return mockingcase;
};

/**
 * Overrides console.log input to print the input mOcKiNgCaSe.
 * @param {Options} [options={random: false, onlyLetters: false, firstUpper: false, upper: null, lower: null}] Conversion options.
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
 * @private
 * @returns {boolean} If the given input is an array of strings.
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
 * @param {string} input-  The string to convert.
 * @private
 * @returns The given string with random casings.
 */
function randomCase(input) {
  return convert(input, () => Math.round(Math.random()));
}

/**
 * Converts matched letters to a specified case
 * @param {string} input - The string to convert.
 * @param {(string | RegExp)} regex - Use to match letters you want to convert.
 * @param {function} caseReplacer - A function that changes the letter's case.
 * @private
 * @returns {string} Given input with match letters to the  case type determined
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
 * @param {string} input - The string to convert.
 * @param {function(string, number)} shouldLetterBeUpperCase -  A function given a character and its index,
 * which returns if the given letter should be set to uppercase. If false, the letter will be lowercase.
 * @private
 * @returns The converted string.
 */
function convert(input, shouldLetterBeUpperCase) {
  return input.replace(/./g, (str, i) => (shouldLetterBeUpperCase(str, i) ? str.toUpperCase() : str.toLowerCase()));
}

try {
  module.exports = mockingcase;
} catch (e) {} // eslint-disable-line no-empty
