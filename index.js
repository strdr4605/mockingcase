'use strict';

module.exports = (input, options) => {
  options = Object.assign({
		random: false
	}, options);
  return input.replace(/./g, (s, i) => {
    if(options.random) return Math.round(Math.random()) ? s.toUpperCase() : s.toLowerCase()
    else return i % 2 ? s.toUpperCase() : s.toLowerCase()
  });
}  
