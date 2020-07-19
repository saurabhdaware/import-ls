#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { execRegexOnAll, flagValue } = require('./helpers.js');

const root = process.argv[2];

/**
 * Recursive function that returns the complete tree starting from given node
 * @param {String} node - Path of the root file
 */
function findChildrens(node) {
  const jsText = fs.readFileSync(path.join(process.cwd(), node), 'utf-8');

  const requireRegex = flagValue('--module-type') === 'require' 
    ? /require\(["'"](.*?)["'"]\)/g 
    : /import \w*? from ["'](.*?)["']/g

  const { matches } =  execRegexOnAll(requireRegex, jsText);
  const childrens = matches.map(match => path.join(path.dirname(node), match[1]))
  let nodes = [];
  for (const children of childrens) {
    nodes.push({parent: children, childrens: findChildrens(children)});
  }

  return nodes;
}

/** Prints tree with proper formating */
function printTree(tree, tab = '') {
  if (!tree) return;
  console.log('|-' + tab + ' ' + tree.parent);
  for (const childTree of tree.childrens) {
    printTree(childTree, tab + '--');
  }
}

/**
 * Main
 */
const outputTree = {
  parent: root,
  childrens: findChildrens(root)
}

console.log("\nHere's your file-import tree 🌻\n");
printTree(outputTree);
console.log();