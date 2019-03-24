'use strict';

/**
 * This function receives a string input and converts it to mOcKiNgCaSe.
 * @param {(string | string[])} input - string or array of strings to be converted
 * @param {object} [options={random: false}] - options for converting
 * @param {boolean} options.random=false - using random for converting
 * @returns {string} string in mOcKiNgCaSe
 */
function mOcKiNgCaSe(input = "", options) {
  options = Object.assign({
    random: false,
  }, options);

  //First, check to see that an input is recieved, and throw error if not
  if(input === ""){
    throw new Error("An input is required")
  }

  if (isArrayOfStrings(input)) input = input.join('');

  return input.replace(/./g, (s, i) => {
    if (options.random) return Math.round(Math.random()) ? s.toUpperCase() : s.toLowerCase();
    else return i % 2 ? s.toUpperCase() : s.toLowerCase();
  });
}

/**
 * This function receives a string input and outputs a message to the console in mOcKiNgCaSe.
 * @param {(string | string[])} input - string or array of string to be converted
 * @param {object} [options={random: false}] - options for converting
 * @param {boolean} options.random=false - using random for converting
 */
mOcKiNgCaSe.log = (input, options) => console.log(mOcKiNgCaSe(input, options));

const isArrayOfStrings = (input) => {
  if (Array.isArray(input)) {
    input.forEach((value, i) => {
      if (typeof value !== 'string') throw TypeError(`Expected array of strings but got type '${typeof value}' at  index ${i}`);
    });
    // If no error found returns true
    return true;
  }
}

/**
 * Creates `String.prototype.toMockingCase()`.
 * @return mOcKiNgCaSe
 */
mOcKiNgCaSe.overrideString = () => {

  /**
    * Converts this string to mOcKiNgCaSe.
    * @see mOcKiNgCaSe
    */
   String.prototype.toMockingCase = function() {
     return mOcKiNgCaSe(this);
   };

   return mOcKiNgCaSe;
}

module.exports = mOcKiNgCaSe;
