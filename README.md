# mOcKiNgCaSe [![Build Status](https://travis-ci.org/strdr4605/mockingcase.svg?branch=master)](https://travis-ci.org/strdr4605/mockingcase)

> Convert a string to mOcKiNgCaSe.

<img align="right" width="300" src="https://raw.githubusercontent.com/strdr4605/mockingcase/master/mOcKiNgsPoNgEbOb.png" alt="mocking spongebob" />

Inspired by the meme [Mocking Spongebob](https://knowyourmeme.com/memes/mocking-spongebob) and http://dannypage.github.io/spongebob.html

## Install

```
$ npm install mockingcase --save
```

## Usage

```js
const mOcKiNgCaSe = require('mockingcase');

mOcKiNgCaSe('foo-bar');
//=> 'fOo-bAr'

mOcKiNgCaSe('aa', {random: false});
//=> 'aA'

mOcKiNgCaSe('aa', {random: true});
//=> 'aa'
//=> 'aA'
//=> 'Aa'
//=> 'AA'

mOcKiNgCaSe('foo_bar');
//=> 'fOo_bAr'

mOcKiNgCaSe('Foo-Bar');
//=> 'fOo-bAr'

mOcKiNgCaSe('foo bar 42');
//=> 'fOo bAr 42'

mOcKiNgCaSe('42foo!bar');
//=> '42fOo!bAr'

mOcKiNgCaSe('Foo42!$ Bar');
//=> 'fOo42!$ bAr'

mOcKiNgCaSe('4Foo!$ B2ar');
//=> '4FoO!$ B2Ar'
```

## API

### mOcKiNgCaSe(input, [options]) ⇒ <code>string</code>
This function receives a string input and converts it to mOcKiNgCaSe.

**Returns**: <code>string</code> - string in mOcKiNgCaSe

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> |  | string to be converted |
| [options] | <code>object</code> | <code>{random: false}</code> | options for converting |
| options.random | <code>boolean</code> | <code>false</code> | using random for converting |