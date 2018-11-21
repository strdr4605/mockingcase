'use strict';

module.exports = input => input.replace(/./g, (s, i) => i % 2 ? s.toUpperCase() : s.toLowerCase());
