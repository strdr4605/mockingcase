(function () {
  'use strict';

  /**
   * This function receives a string input and converts it to mOcKiNgCaSe.
   * @param {string} input - string to be converted
   * @param {object} [options={random: false, firstUpper: false}] - options for converting
   * @param {boolean} options.random=false - using random for converting
   * @param {boolean} options.firstUpper=false - use to capitalize all even indices
   * @returns {string} string in mOcKiNgCaSe
   */
  function mOcKiNgCaSe(input, options) {
    options = Object.assign({
      random: false,
      firstUpper: false,
    }, options);

    return input.replace(/./g, (s, i) => {
      if (options.random) return Math.round(Math.random()) ? s.toUpperCase() : s.toLowerCase()
      else if (options.firstUpper) return i % 2 ? s.toLowerCase() : s.toUpperCase()
      else return i % 2 ? s.toUpperCase() : s.toLowerCase()
    });
  }

  module.exports = mOcKiNgCaSe;
})();
