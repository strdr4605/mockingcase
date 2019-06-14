"use strict";

/**
 * Converts the input string(s) to mOcKiNgCaSe.
 * @param {(string | string[])} input String(s) to be converted.
 * @param {object} [options={random: false,  onlyLetters: false}] Conversion options.
 * @param {boolean} options.random=false - If case conversion should be randomized.
 * @param {boolean} options.onlyLetters=false - If non letters characters should be removed.
 * @param {boolean} options.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE).
 * When combined with `options.random`, the first letter of the random string will be capitalized.
 * @returns {string} string in mOcKiNgCaSe
 */
function mOcKiNgCaSe(input = "", options) {
  options = Object.assign(
    {
      random: false,
      onlyLetters: false,
      firstUpper: false
    },
    options
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
    return input;
  }

  if (options.firstUpper) {
    return convert(input, (str, i) => i % 2 === 0);
  } else {
    return convert(input, (str, i) => i % 2 === 1);
  }
}

/**
 * Outputs a message to the console in mOcKiNgCaSe.
 * @param {(string | string[])} input String(S) to be converted.
 * @param {object} [options={random: false}] Options for converting.
 * @param {boolean} options.random=false - If case conversion should be randomized.
 * @param {boolean} options.onlyLetters=false - If non letters characters should be removed.
 * @param {boolean} options.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE).
 * When combined with `options.random`, the first letter of the random string will be capitalized.
 */
mOcKiNgCaSe.log = (input, options) => console.log(mOcKiNgCaSe(input, options));

/**
 * Outputs a mOcKiNgCaSe with default options.
 * @param {object} defaultOptions Options for converting.
 * @param {boolean} defaultOptions.random=false - If case conversion should be randomized.
 * @param {boolean} defaultOptions.onlyLetters=false - If non letters characters should be removed.
 * @param {boolean} defaultOptions.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE). * @returns {string} string in mOcKiNgCaSe
 * @return mOcKiNgCaSe with default options
 */
mOcKiNgCaSe.config = defaultOptions => {
  return (input = "", overridedDefaultOptions) => {
    const options = overridedDefaultOptions || defaultOptions;
    return mOcKiNgCaSe(input, options);
  };
};

/**
 * Creates `String.prototype.toMockingCase()`.
 * @return mOcKiNgCaSe
 */
mOcKiNgCaSe.overrideString = () => {
  /**
   * Converts this string to mOcKiNgCaSe.
   * @param {object} [options={random: false}] Options for converting.
   * @param {boolean} options.random=false - If case conversion should be randomized.
   * @param {boolean} options.onlyLetters=false - If non letters characters should be removed.
   * @param {boolean} options.firstUpper=false - If the first letter should be capitalized instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE).
   * When combined with `options.random`, the first letter of the random string will be capitalized.
   * @returns {string} string in mOcKiNgCaSe
   * @see mOcKiNgCaSe
   */
  String.prototype.toMockingCase = function(options) {
    return mOcKiNgCaSe(this, options);
  };

  return mOcKiNgCaSe;
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
      throw TypeError(
        `Expected array of strings but got type '${typeof value}' at index ${i}`
      );
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
 * Converts the string.
 * @param {string} input The string to convert.
 * @param {function(string, number)} shouldLetterBeUpperCase A function given a character and its index,
 * which returns if the given letter should be set to uppercase. If false, the letter will be lowercase.
 * @return The converted string.
 */
function convert(input, shouldLetterBeUpperCase) {
  return input.replace(/./g, (str, i) => {
    return shouldLetterBeUpperCase(str, i)
      ? str.toUpperCase()
      : str.toLowerCase();
  });
}

module.exports = mOcKiNgCaSe;
