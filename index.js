'use strict';

module.exports = (input) => {
  let res = "";
  for (let i = 0; i < input.length; i++) {
      res += i % 2 == 0 ? input.charAt(i).toLowerCase() : input.charAt(i).toUpperCase();
  }
  return res;
}