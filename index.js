const assign = require('lodash.assign');

module.exports = markdownItAst;

/**
 * Create an AST from a markdown-it token stream.
 * @param {Object[]} tokens - markdown-it token stream.
 * @param {Boolean} [sub=false] - If `true`, the top-level node is being rendered.
 * @returns {Object} Nodes representing Markdown structure.
 */
function markdownItAst(tokens, sub = false) {
  const node = {
    nodes: [],
    type: 'root',
  };
  const nodes = [node];
  const stack = [];

  const len = tokens.length;
  let idx = -1;

  while (++idx < len) {
    const tok = tokens[idx];
    const prev = last();

    if (isOpen(tok)) {
      const token = {
        type: toType(tok),
        nodes: [tok],
      };
      prev.nodes.push(token);
      stack.push(token);
    }
    else if (isClose(tok)) {
      const parent = stack.pop();
      parent.nodes.push(tok);
    }
    else if (isInline(tok) && tok.children) {
      tok.nodes = markdownItAst(tok.children, true);
      delete tok.children;
      prev.nodes.push(tok);
    }
    else {
      prev.nodes.push(tok);
    }
  }

  function last() {
    return stack.length
      ? stack[stack.length - 1]
      : nodes[nodes.length - 1];
  }

  if (sub) {
    return node.nodes;
  }
  else {
    return node;
  }
}

/**
 * Check if a token is an open token.
 * @param {Object} token - Token to check.
 * @returns {Boolean} If token is an open token.
 */
function isOpen(token) {
  return /_open$/.test(token.type);
}

/**
 * Check if a token is a close token.
 * @param {Object} token - Token to check.
 * @returns {Boolean} If token is a close token.
 */
function isClose(token) {
  return /_close$/.test(token.type);
}

/**
 * Check if a token is inline.
 * @param {Object} token - Token to check.
 * @returns {Boolean} If token is inline.
 */
function isInline(token) {
  return token.type === 'inline';
}

/**
 * Get the pure type of a token.
 * @param {Object} token - Token to examine.
 * @returns {String} Token type.
 * @example
 * toType({ type: 'paragraph' }); // => 'paragraph'
 * toType({ type: 'paragraph_open' }); // => 'paragraph'
 */
function toType(token) {
  return token.type.replace(/_open$/, '');
}
