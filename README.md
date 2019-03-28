# mOcKiNgCaSe [![Build Status](https://travis-ci.org/strdr4605/mockingcase.svg?branch=master)](https://travis-ci.org/strdr4605/mockingcase)

> Convert a string to mOcKiNgCaSe.

Read more on wikipedia [Studly caps](https://en.wikipedia.org/wiki/Studly_caps).

<img align="right" width="300" src="https://raw.githubusercontent.com/strdr4605/mockingcase/master/mOcKiNgsPoNgEbOb.png" alt="mocking spongebob" />

Inspired by the meme [Mocking Spongebob](https://knowyourmeme.com/memes/mocking-spongebob) and http://dannypage.github.io/spongebob.html

## Install

```
$ npm install mockingcase --save
```

## Usage

```js
const mOcKiNgCaSe = require('mockingcase');
// es6 - import mOcKiNgCaSe from 'mockingcase';
//  ts - import * as mOcKiNgCaSe from 'mockingcase';
//  ts - import mOcKiNgCaSe = require('mockingcase');

mOcKiNgCaSe('foo-bar');
//=> 'fOo-bAr'

mOcKiNgCaSe('aa', {random: false});
//=> 'aA'

mOcKiNgCaSe('aa', {random: true});
//=> 'aa'
//=> 'aA'
//=> 'Aa'
//=> 'AA'

mOcKiNgCaSe('aa123', {onlyLetters: true});
//=> 'aA'

mOcKiNgCaSe('a13%$a', {onlyLetters: true});
//=> 'aA'

mOcKiNgCaSe('foo bar', {firstUpper: true});
//=> 'FoO BaR'

mOcKiNgCaSe('foo', {firstUpper: true, random: true});
//=> 'Foo'
//=> 'FOo'
//=> 'FoO'
//=> 'FOO'

mOcKiNgCaSe('foo_bar');
//=> 'fOo_bAr'

mOcKiNgCaSe('Foo-Bar');
//=> 'fOo-bAr'

mOcKiNgCaSe('foo bar 42');
//=> 'fOo bAr 42'

mOcKiNgCaSe('42foo!bar');
//=> '42fOo!bAr'

mOcKiNgCaSe(['foo','bar']);
//=> 'fOoBaR';

mOcKiNgCaSe(undefined);
//=> Error "An input is required

mOcKiNgCaSe.log('foo bar');
// console.log('fOo bAr');

// Optionally create String.prototype.toMockingCase
mOcKiNgCaSe.overrideString();

'foo_bar'.toMockingCase();
//=> 'fOo_bAr'
```

## API
<a name="mOcKiNgCaSe"></a>

### mOcKiNgCaSe(input, [options]) ⇒ <code>string</code>
Converts the input string(s) to mOcKiNgCaSe.

**Kind**: global function  
**Returns**: <code>string</code> - string in mOcKiNgCaSe

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>string[]</code> |  | String(s) to be converted |
| [options] | <code>object</code> | <code>{random: false, onlyLetters: false, firstUpper: false}}</code> | Conversion options |
| options.random | <code>boolean</code> | <code>false</code> | If case conversion should be randomized |
| options.onlyLetters | <code>boolean</code> | <code>false</code> | If non letters characters should be removed |
| options.firstUpper | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE). When combined with `options.random`, the first letter of the random string will be capitalized |

<hr>

<a name="mOcKiNgCaSe.overrideString"></a>

### mOcKiNgCaSe.overrideString() ⇒ <code>mOcKiNgCaSe</code>
Creates `String.prototype.toMockingCase()`.

**Kind**: global function  
**Returns**: <code>mOcKiNgCaSe</code> - The mOcKiNgCaSe module.  
**See**: <code>toMockingCase</code>

<hr>

<a name="String.prototype.toMockingCase"></a>

### String.prototype.toMockingCase() ⇒ <code>string</code>
Converts `this` string to mOcKiNgCaSe.

**NOTE**: this function is created by invoking `mOcKiNgCaSe.overrideString()`.

**Kind**: prototype  
**Returns**: <code>string</code> - local string in mOcKiNgCaSe

<hr>

<a name="mOcKiNgCaSe.log"></a>

### mOcKiNgCaSe.log(input, [options])
Outputs a message to the console in mOcKiNgCaSe.

**Kind**: static method of [<code>mOcKiNgCaSe</code>](#mOcKiNgCaSe)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>string[]</code> |  | String(S) to be converted |
| [options] | <code>object</code> | <code>{random: false, onlyLetters: false, firstUpper: false}</code> | Conversion options |
| options.random | <code>boolean</code> | <code>false</code> | If case conversion should be randomized |
| options.onlyLetters | <code>boolean</code> | <code>false</code> | If non letters characters should be removed |
| options.firstUpper | <code>boolean</code> | <code>false</code> | If the first letter should be capitalized instead of the second when converting to mOcKiNgCaSe (e.g. MoCkInGcAsE). When combined with `options.random`, the first letter of the random string will be capitalized |

<a name="mOcKiNgCaSe"></a>
