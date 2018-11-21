'use strict';

module.exports = input => input.replace(/./g, (s, i) => Math.round(Math.random()) ? s.toUpperCase() : s.toLowerCase());
