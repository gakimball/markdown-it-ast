# markdown-it-ast

> Create an AST from a markdown-it token stream

[![Travis](https://img.shields.io/travis/gakimball/markdown-it-ast.svg?maxAge=2592000)](https://travis-ci.org/gakimball/markdown-it-ast) [![npm](https://img.shields.io/npm/v/markdown-it-ast.svg?maxAge=2592000)](https://www.npmjs.com/package/markdown-it-ast)

[markdown-it](https://github.com/markdown-it/markdown-it)'s `parse()` function generates a token stream, but there's no method for building an AST, which would be useful to render Markdown to a medium other than HTML. This library converts a token stream to a hierarchical AST. The code is derived from [this markdown-it issue](https://github.com/jonschlinkert/remarkable/issues/231), with some changes.

## Installation

```bash
npm install markdown-it-ast
```

## Usage

```js
const markdownIt = require('markdown-it');
const ast = require('markdown-it-ast');

const md = new markdownIt();
ast(md.render('# Hello world.'));
```

## API

### ast(tokens)

Create an AST from a markdown-it token stream.

- **tokens** (Array of Objects): markdown-it token stream.

Returns (Object) nodes representing Markdown structure.

## Local Development

```bash
git clone https://github.com/gakimball/markdown-it-ast
cd markdown-it-ast
npm install
npm test
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
