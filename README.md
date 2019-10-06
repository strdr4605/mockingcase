# mockingcase [![Build Status](https://travis-ci.org/strdr4605/mockingcase.svg?branch=master)](https://travis-ci.org/strdr4605/mockingcase)

> Convert a string to mOcKiNgCaSe.

Read more on wikipedia [Studly caps](https://en.wikipedia.org/wiki/Studly_caps).

<img align="right" width="300" src="https://raw.githubusercontent.com/strdr4605/mockingcase/master/mOcKiNgsPoNgEbOb.png" alt="mocking spongebob" />

Inspired by the meme [Mocking Spongebob](https://knowyourmeme.com/memes/mocking-spongebob) and http://dannypage.github.io/spongebob.html

## Install

```bash
npm install @strdr4605/mockingcase --save
```

## Usage

```js
const mockingcase = require('@strdr4605/mockingcase');
// es6 - import mockingcase from '@strdr4605/mockingcase';
//  ts - import * as mockingcase from '@strdr4605/mockingcase';
//  ts - import mockingcase = require('@strdr4605/mockingcase');

mockingcase('foo-bar');
//=> 'fOo-bAr'

mockingcase('aa', {random: false});
//=> 'aA'

mockingcase('aa', {random: true});
//=> 'aa'
//=> 'aA'
//=> 'Aa'
//=> 'AA'

mockingcase('42foo!bar');
//=> '42fOo!bAr'

mockingcase('aa123', {onlyLetters: true});
//=> 'aA'

mockingcase('a13%$a', {onlyLetters: true});
//=> 'aA'

mockingcase('foo bar', {firstUpper: true});
//=> 'FoO BaR'

mockingcase('foo', {firstUpper: true, random: true});
//=> 'Foo'
//=> 'FOo'
//=> 'FoO'
//=> 'FOO'

mockingcase('abcdef', {upper: /[bdf]/});
//=> 'aBcDeF'

mockingcase('ABCDEF', {lower: 'bcd'});
//=> 'abcdeF'
```

## API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [mockingcase(input, [options]) ⇒ <code>string</code>](#mockingcase)
- [mockingcase.overrideString() ⇒ <code>mockingcase</code>](#mockingcase.overrideString)
- [String.prototype.toMockingCase([options]) ⇒ <code>string</code>](#String.prototype.toMockingCase)
- [mockingcase.config(defaultOptions) ⇒ <code>mockingcase</code>](#mockingcase.config)
- [mockingcase.log(input, [options])](#mockingcase.log)
- [mockingcase.overrideConsole([options]) ⇒ <code>mockingcase</code>](#mockingcase.overrideConsole)
- [Browser Usage](#browser-usage)

<a name="mockingcase"></a>

### mockingcase(input, [options]) ⇒ <code>string</code>
Converts the input string(s) to mockingcase.

**Kind**: global function
**Returns**: <code>string</code> - string in mockingcase

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>string[]</code> |  | String(s) to be converted |
| [options] | <code>object</code> | <code>{random: false, onlyLetters: false, firstUpper: false}</code> | Conversion options |
| options.random | <code>boolean</code> | <code>false</code> | If case conversion should be randomized |
| options.onlyLetters | <code>boolean</code> | <code>false</code> | If non letters characters should be removed |
| options.firstUpper | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE). When combined with `options.random`, the first letter of the random string will be capitalized |
| options.upper | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to uppercase |
| options.lower | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to lowercase |

```js
mockingcase('foo-bar');
//=> 'fOo-bAr'

mockingcase('aa', {random: false});
//=> 'aA'

mockingcase('aa', {random: true});
//=> 'aa'
//=> 'aA'
//=> 'Aa'
//=> 'AA'

mockingcase('42foo!bar');
//=> '42fOo!bAr'

mockingcase('aa123', {onlyLetters: true});
//=> 'aA'

mockingcase('a13%$a', {onlyLetters: true});
//=> 'aA'

mockingcase('foo bar', {firstUpper: true});
//=> 'FoO BaR'

mockingcase('foo bar', {firstUpper: true, lower: /[fb]/});
//=> 'foO baR'

mockingcase('foo bar', {firstUpper: true, upper: /[oa]/});
//=> 'FOO BAR'

mockingcase('foo', {firstUpper: true, random: true});
//=> 'Foo'
//=> 'FOo'
//=> 'FoO'
//=> 'FOO'

mockingcase(['foo','bar']);
//=> 'fOoBaR'

mockingcase(undefined);
//=> Error "An input is required"
```
<hr>

<a name="mockingcase.overrideString"></a>

### mockingcase.overrideString() ⇒ <code>mockingcase</code>
Creates `String.prototype.toMockingCase()`.

**Kind**: global function
**Returns**: <code>mockingcase</code> - The mockingcase module.
**See**: <code>toMockingCase</code>

```js
mockingcase.overrideString();

'foo_bar'.toMockingCase();
//=> 'fOo_bAr'

'foo_bar'.toMockingCase({firstUpper: true});
//=> 'FoO_BaR'
```
<hr>

<a name="String.prototype.toMockingCase"></a>

### String.prototype.toMockingCase([options]) ⇒ <code>string</code>
Converts `this` string to mockingcase.

**NOTE**: this function is created by invoking `mockingcase.overrideString()`.

**Kind**: prototype
**Returns**: <code>string</code> - local string in mockingcase

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{random: false, onlyLetters: false, firstUpper: false}</code> | Conversion options |
| options.random | <code>boolean</code> | <code>false</code> | If case conversion should be randomized |
| options.onlyLetters | <code>boolean</code> | <code>false</code> | If non letters characters should be removed |
| options.firstUpper | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE). When combined with `options.random`, the first letter of the random string will be capitalized |
| options.upper | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to uppercase |
| options.lower | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to lowercase |

```js
'foo_bar'.toMockingCase();
//=> 'fOo_bAr'

'foo_bar'.toMockingCase({firstUpper: true});
//=> 'FoO_BaR'
```
<hr>

<a name="mockingcase.config"></a>

### mockingcase.config(defaultOptions) ⇒ <code>mockingcase</code>
Outputs a mockingcase with default options.

**Kind**: static method of [<code>mockingcase</code>](#mockingcase)
**Returns**: mockingcase with default options

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| defaultOptions | <code>object</code> |  | Options for converting |
| defaultOptions.random | <code>boolean</code> | <code>false</code> | If case conversion should be randomized |
| defaultOptions.onlyLetters | <code>boolean</code> | <code>false</code> | If non letters characters should be removed |
| defaultOptions.firstUpper | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE). When combined with `options.random`, the first letter of the random string will be capitalized |
| options.upper | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to uppercase |
| options.lower | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to lowercase |

```js
const mockingcase = require('@strdr4605/mockingcase').config({onlyLetters: true, firstUpper: true});
// const mockingcase = mockingcase.config({onlyLetters: true, firstUpper: true});

mockingcase('foo bar42');
//=> 'FoO BaR'

mockingcase('foo bar42', {onlyLetters: false, firstUpper: false});
//=> 'fOo bAr42'
```
<hr>

<a name="mockingcase.log"></a>

### mockingcase.log(input, [options])
Outputs a message to the console in mockingcase.

**Kind**: static method of [<code>mockingcase</code>](#mockingcase)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>string[]</code> |  | String(S) to be converted |
| [options] | <code>object</code> | <code>{random: false, onlyLetters: false, firstUpper: false}</code> | Conversion options |
| options.random | <code>boolean</code> | <code>false</code> | If case conversion should be randomized |
| options.onlyLetters | <code>boolean</code> | <code>false</code> | If non letters characters should be removed |
| options.firstUpper | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE). When combined with `options.random`, the first letter of the random string will be capitalized |
| options.upper | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to uppercase |
| options.lower | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to lowercase |

```js
mockingcase.log('foo bar');
// console.log('fOo bAr');
```

<a name="mockingcase"></a>

<hr>

<a name="mockingcase.overrideConsole"></a>

### mockingcase.overrideConsole([options]) ⇒ <code>mockingcase</code>
Overrides the console.log input annd prints it in the mockingcase.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{random: false, onlyLetters: false, firstUpper: false}</code> | Conversion options |
| options.random | <code>boolean</code> | <code>false</code> | If case conversion should be randomized |
| options.onlyLetters | <code>boolean</code> | <code>false</code> | If non letters characters should be removed |
| options.firstUpper | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mockingcase (e.g. MoCkInGcAsE). When combined with `options.random`, the first letter of the random string will be capitalized |
| options.upper | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to uppercase |
| options.lower | <code>RegExp</code> \| <code>string</code> | <code>null</code> | Characters or substring set to change to lowercase |

```js
const mockingcase = require('@strdr4605/mockingcase').overrideConsole();
console.log('foobar')
// => 'fOoBaR'
mockingcase('foobar');
// => 'fOoBaR'
```
<a name="mockingcase"></a>

<hr>

## Browser Usage
mockingcase can be used in a node environment, as well as in the browser. You can serve it yourself, or pull it from a CDN. For example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>mockingcase</title>
</head>
<body>
</body>
<script src="https://unpkg.com/mockingcase/index.js"></script>
<script>
  const output = mockingcase('foo-bar');
  console.log(output);
  const output2 = mockingcase('foo-bar');
  console.log(output2);
</script>
</html>
```
### Self Hosting
To host mockingcase yourself simply put `index.js` wherever your static content (like CSS stylesheets) are kept. You can also download a minified file from one of the CDNs below.

### CDN Usage
Simply pull in one of the following JS files below.

|Name|Link|
|-|-|
|unpkg.com|https://unpkg.com/mockingcase/index.js|
|JSDelivr.com|https://cdn.jsdelivr.net/npm/mockingcase/index.min.js|

**See also [Mockingcase bindings for ReasonML](https://redex.github.io/package/unpublished/strdr4605/bs-mockingcase)**



