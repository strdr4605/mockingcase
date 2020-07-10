# mockingcase [![Build Status](https://travis-ci.org/strdr4605/mockingcase.svg?branch=master)](https://travis-ci.org/strdr4605/mockingcase) [![Hits-of-Code](https://hitsofcode.com/github/strdr4605/mockingcase)](https://hitsofcode.com/view/github/strdr4605/mockingcase) [![HitCount](http://hits.dwyl.com/strdr4605/mockingcase.svg)](http://hits.dwyl.com/strdr4605/mockingcase)



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
- [Options](#Options)
- [Browser Usage](#mockingcase.browserUsage)

## Functions

<dl>
<dt><a href="#mockingcase">mockingcase(input, [options])</a> ⇒ <code>string</code></dt>
<dd><p>Converts the input string(s) to mOcKiNgCaSe.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Options">Options</a> : <code>Object</code></dt>
<dd><p>Options for mockingcase</p>
</dd>
</dl>

<a name="mockingcase"></a>

## mockingcase(input, [options]) ⇒ <code>string</code> [:arrow_up:](#api)
Converts the input string(s) to mOcKiNgCaSe.

**Kind**: global function 
**Returns**: <code>string</code> - string in mOcKiNgCaSe  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | String(s) to be converted. |
| [options] | [<code>Options</code>](#Options) | <code>{random: false,  onlyLetters: false, firstUpper: false, upper: '', lower: ''}</code> | Conversion options. |

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

### mockingcase.overrideString() ⇒ <code>mockingcase</code> [:arrow_up:](#api)
Creates `String.prototype.toMockingCase()`.

**Kind**: static method of [<code>mockingcase</code>](#mockingcase)  
**Returns**: mockingcase  

```js
mockingcase.overrideString();

'foo_bar'.toMockingCase();
//=> 'fOo_bAr'

'foo_bar'.toMockingCase({firstUpper: true});
//=> 'FoO_BaR'
```
<hr>

<a name="String.prototype.toMockingCase"></a>

### String.prototype.toMockingCase([options]) ⇒ <code>string</code> [:arrow_up:](#api)
Converts `this` string to mOcKiNgCaSe.

**NOTE**: this function is created by invoking `mockingcase.overrideString()`.

**Kind**: prototype  
**Returns**: <code>string</code> - local string in mOcKiNgCaSe  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | String(S) to be converted. |
| [options] | [<code>Options</code>](#Options) | <code>{random: false,  onlyLetters: false, firstUpper: false, upper: '', lower: ''}</code> | Conversion options. |

```js
'foo_bar'.toMockingCase();
//=> 'fOo_bAr'

'foo_bar'.toMockingCase({firstUpper: true});
//=> 'FoO_BaR'
```
<hr>

<a name="mockingcase.config"></a>

### mockingcase.config(defaultOptions) ⇒ <code>mockingcase</code> [:arrow_up:](#api)
Outputs a mockingcase with default options.

**Kind**: static method of [<code>mockingcase</code>](#mockingcase)  
**Returns**: mockingcase with default options  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| defaultOptions | [<code>Options</code>](#Options) | <code>{random: false,  onlyLetters: false, firstUpper: false, upper: '', lower: ''}</code> | Conversion options. |


```js
const mockingcase = require('@strdr4605/mockingcase').config({onlyLetters: true, firstUpper: true});
// const mOcKiNgCaSe = mOcKiNgCaSe.config({onlyLetters: true, firstUpper: true});

mockingcase('foo bar42');
//=> 'FoO BaR'

mockingcase('foo bar42', {onlyLetters: false, firstUpper: false});
//=> 'fOo bAr42'
```
<hr>

<a name="mockingcase.log"></a>

### mockingcase.log(input, [options]) [:arrow_up:](#api)
Outputs a message to the console in mOcKiNgCaSe.

**Kind**: static method of [<code>mockingcase</code>](#mockingcase)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | String(S) to be converted. |
| [options] | [<code>Options</code>](#Options) | <code>{random: false,  onlyLetters: false, firstUpper: false, upper: '', lower: ''}</code> | Conversion options. |

```js
mockingcase.log('foo bar');
// console.log('fOo bAr');
```

<a name="mockingcase"></a>

<hr>

<a name="mockingcase.overrideConsole"></a>

### mockingcase.overrideConsole([options]) ⇒ <code>mockingcase</code> [:arrow_up:](#api)
Overrides console.log input to print the input mOcKiNgCaSe.

**Kind**: static method of [<code>mockingcase</code>](#mockingcase)  
**Returns**: <code>function</code> - mockingcase function  
**See**: mockingcase  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | [<code>Options</code>](#Options) | <code>{random: false,  onlyLetters: false, firstUpper: false, upper: '', lower: ''}</code> | Conversion options. |

```js
const mockingcase = require('@strdr4605/mockingcase').overrideConsole();
console.log('foobar')
// => 'fOoBaR'
mockingcase('foobar');
// => 'fOoBaR'
```
<hr>

<a name="Options"></a>

## Options : <code>Object</code> [:arrow_up:](#api)
Options for mockingcase

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [random] | <code>boolean</code> | <code>false</code> | If case conversion should be randomized. |
| [onlyLetters] | <code>boolean</code> | <code>false</code> | If non letters characters should be removed. |
| [firstUpper] | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE). When combined with options.random, the first letter of the random string will be capitalized. |
| [upper] | <code>string</code> \| <code>RegExp</code> | <code>''</code> | Characters or substring set to change to uppercase, `upper` has higher priority that `lower`. |
| [lower] | <code>string</code> \| <code>RegExp</code> | <code>''</code> | Characters or substring set to change to lowercase. |

<hr>

<a name="mockingcase.browserUsage"></a>

## Browser Usage [:arrow_up:](#api)
mOcKiNgCaSe can be used in a node environment, as well as in the browser. You can serve it yourself, or pull it from a CDN. For example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>mockingcase</title>
</head>
<body>
</body>
<script src="https://unpkg.com/@strdr4605/mockingcase@1.10.3/src/mockingcase.js"></script>
<script>
  const output = mockingcase('foo-bar');
  console.log(output);
  const output2 = mockingcase('foo-bar');
  console.log(output2);
</script>
</html>
```
### Self Hosting
To host mockingcase yourself simply put `src/mockingcase.js` wherever your static content (like CSS stylesheets) are kept. You can also download a minified file from one of the CDNs below.

### CDN Usage
Simply pull in one of the following JS files below.

|Name|Link|
|-|-|
|unpkg.com|https://unpkg.com/@strdr4605/mockingcase|
|JSDelivr.com|https://cdn.jsdelivr.net/npm/@strdr4605/mockingcase|

**See also [Mockingcase bindings for ReasonML](https://redex.github.io/package/unpublished/strdr4605/bs-mockingcase)**

<a href="https://www.buymeacoffee.com/strdr4605"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;"  target="_blank"></a>
