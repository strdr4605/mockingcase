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

    if (Array.isArray(input)){
      isAnArrayOfString(input)?
        input = input.join('')
        :
        function(){
          throw "If the input is an array, it must be an array of strings.";
        }()
      };



    return input.replace(/./g, (s, i) => {
      if (options.random) return Math.round(Math.random()) ? s.toUpperCase() : s.toLowerCase()
      else return i % 2 ? s.toUpperCase() : s.toLowerCase()
    });
  }

  mOcKiNgCaSe.log = (input, options) => console.log(mOcKiNgCaSe(input, options));

  module.exports = mOcKiNgCaSe;
})();

// This function check if the input is an array of string

function isAnArrayOfString(input){
    return input.every(function(currentValue){return typeof currentValue === 'string'});

}
