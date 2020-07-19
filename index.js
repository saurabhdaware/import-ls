#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { execRegexOnAll, flagValue, grey } = require('./helpers.js');

const root = process.argv[2];

const requireREGEX = /require\(["'"](.*?)["'"]\)/g
const es6importREGEX = / from ["'](.*?)["']/g
let moduleRegex;

/**
 * Recursive function that returns the complete tree starting from given node
 * @param {String} node - Path of the root file
 */
function findChildrens(node) {
  const jsPath = path.join(process.cwd(), node);
  let jsText;
  if (fs.existsSync(jsPath)) {
    jsText = fs.readFileSync(jsPath, 'utf-8');
  } else if (fs.existsSync(jsPath + '.js')) {
    jsText = fs.readFileSync(jsPath + '.js', 'utf-8')
  }

  if (node === root) {
    // only need to figure out module system in the beginning
    const doesRequireExistsInCode = jsText.match(requireREGEX);
    const doesES6ImportExistsInCode = jsText.match(es6importREGEX);
  
    if (flagValue('--module-type') === 'require') {
      moduleRegex = requireREGEX;
    } else if (flagValue('--module-type') === 'import') {
      moduleRegex = es6importREGEX;
    } else if (doesRequireExistsInCode && !doesES6ImportExistsInCode) {
      moduleRegex = requireREGEX;
    } else if (doesES6ImportExistsInCode && !doesRequireExistsInCode) {
      moduleRegex = es6importREGEX;
    } else {
      throw new Error('Could not figure out which module system is being used. Please use `--module-type require` or `--module-type import` flag to specify import type');
    }
  }

  const { matches } =  execRegexOnAll(moduleRegex, jsText);
  const childrens = matches.map(match => path.join(path.dirname(node), match[1]))

  let nodes = [];
  for (const children of childrens) {
    if (!fs.existsSync(path.join(process.cwd(), children)) && !fs.existsSync(path.join(process.cwd(), children + '.js'))) {
      nodes.push({parent: node, value: path.basename(children) + ' (module)', childrens: []})
      continue;
    }
    nodes.push({parent: node, value: children, childrens: findChildrens(children)});
  }

  return nodes;
}

/** Prints tree with proper formating */
function printTree(tree, tab = '', options = {}) {
  if (!tree) return;
  console.log(`|${tab} ${tree.value} ${options.showParent ? grey(`(Parent: ${tree.parent})`): ''}`)
  for (const childTree of tree.childrens) {
    printTree(childTree, tab + '--', options);
  }
}

/**
 * Main
 */
const outputTree = {
  parent: '',
  value: root,
  childrens: findChildrens(root)
}

console.log("\nHere's your file-import tree 🌻\n");
printTree(outputTree, '', { showParent: flagValue('--show-parent') === undefined });
console.log();