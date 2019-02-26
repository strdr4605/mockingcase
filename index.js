(function () {
  'use strict';

  /**
   * This function receives a string input and converts it to mOcKiNgCaSe.
   * @param {string} input - string to be converted
   * @param {object} [options={random: false}] - options for converting
   * @param {boolean} options.random=false - using random for converting
   * @returns {string} string in mOcKiNgCaSe
   */
  function mOcKiNgCaSe(input, options) {
    options = Object.assign({
      random: false
    }, options);

    return input.replace(/./g, (s, i) => {
      if (options.random) return Math.round(Math.random()) ? s.toUpperCase() : s.toLowerCase()
      else return i % 2 ? s.toUpperCase() : s.toLowerCase()
    });
  }

  /**
   * This function receives a string input and outputs a message to the console in mOcKiNgCaSe.
   * @param {string} input - string to be converted
   * @param {object} [options={random: false}] - options for converting
   * @param {boolean} options.random=false - using random for converting
   */
  mOcKiNgCaSe.log = (input, options) => console.log(mOcKiNgCaSe(input, options));

  module.exports = mOcKiNgCaSe;
})();
