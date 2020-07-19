#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { recursiveFindFiles, execRegexOnAll } = require('./helpers.js');

const dependencyTree = {}

for(const jsFile of recursiveFindFiles(path.join(__dirname, 'example'), '.js')) {
  const { matches: allRequires } = execRegexOnAll(
    /require\(['"](.*?)['"]\)/g, 
    fs.readFileSync(jsFile, 'utf-8')
  );

  const currentPath = path.relative(process.cwd(), jsFile)
  dependencyTree[currentPath] = allRequires.map(match => 
    path.join(path.dirname(currentPath), match[1])
  );
}

console.log(dependencyTree);