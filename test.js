const ast = require('.');
const { expect } = require('chai');
const markdownIt = require('markdown-it');
const md = new markdownIt();

describe('markdown-it-ast', () => {
  describe('bundles open/close tokens together', () => {
    const { nodes } = ast(md.parse('Hello world.'));

    it('creates a single parent node', () => {
      expect(nodes).to.have.lengthOf(1);
    });

    it('sets the type of the parent node', () => {
      expect(nodes[0]).to.have.property('type', 'paragraph');
    });

    it('includes open/close/inline tokens', () => {
      expect(nodes[0].nodes).to.have.lengthOf(3);
    });
  });

  describe('handles inline tokens with children', () => {
    const { nodes } = ast(md.parse('Hello **world**.')).nodes[0];

    it('adds a nodes property to the inline token', () => {
      expect(nodes[1].nodes).to.be.an('array');
    });

    it('convers child tokens to nodes', () => {
      expect(nodes[1].nodes).to.have.lengthOf(3);
    });
  });
});
