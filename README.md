# is-dom-element [![NPM Version][npm-image]][npm-url] ![File Size][filesize-image] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Monitor][greenkeeper-image]][greenkeeper-url]

> Determine if an object is an `HTMLElement` (from any `Realm`).


## Installation

[Node.js](http://nodejs.org) `>= 10` is required. To install, type this at the command line:
```shell
npm install is-dom-element
```


## Importing

ES Module:
```js
import isDOMElement from 'is-dom-element';
```

CommonJS Module:
```js
const isDOMElement = require('is-dom-element');
```


## Usage

```js
isDOMElement(document.createElement('div')); //-> true
isDOMElement(document.createTextNode('content')); //-> false
````


[npm-image]: https://img.shields.io/npm/v/is-dom-element.svg
[npm-url]: https://npmjs.com/package/is-dom-element
[filesize-image]: https://img.shields.io/badge/size-390B%20gzipped-blue.svg
[travis-image]: https://img.shields.io/travis/stevenvachon/is-dom-element2.svg
[travis-url]: https://travis-ci.org/stevenvachon/is-dom-element2
[coveralls-image]: https://img.shields.io/coveralls/stevenvachon/is-dom-element2.svg
[coveralls-url]: https://coveralls.io/github/stevenvachon/is-dom-element2
[greenkeeper-image]: https://badges.greenkeeper.io/stevenvachon/is-dom-element2.svg
[greenkeeper-url]: https://greenkeeper.io/
