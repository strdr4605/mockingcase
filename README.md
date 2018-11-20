# mOcKiNgCaSe

> Convert a string to mOcKiNgCaSe.

<img align="right" width="300" src="https://github.com/strdr4605/mockingcase/blob/master/mOcKiNgsPoNgEbOb.png" alt="mocking spongebob" />

Inspired by the meme [Mocking Spongebob](https://knowyourmeme.com/memes/mocking-spongebob). and http://dannypage.github.io/spongebob.html

## Install

```
$ npm install mockingcase --save
```

## Usage

```js
const mOcKiNgCaSe = require('mockingcase');

mOcKiNgCaSe('foo-bar');
//=> 'fOo-bAr'

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

### mOcKiNgCaSe(input) ⇒ <code>string</code>
This fuction receive a string input and convert it to mOcKiNgCaSe.

**Returns**: <code>string</code> - string

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | string that must be converted |
