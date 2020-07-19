const fs = require('fs');
const path = require('path');

/**
 *
 * @param {String} base directory to search in
 * @param {String} ext Extension you want to search for (e.g. '.abell')
 * @param {String[]} inputFiles Array of directories
 * @param {String[]} inputResult Holds the old input result
 * @return {String[]} Array of filepaths that end with given extension
 */
function recursiveFindFiles(
  base,
  ext,
  inputFiles = undefined,
  inputResult = undefined
) {
  const files = inputFiles || fs.readdirSync(base);
  let result = inputResult || [];

  for (const file of files) {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = recursiveFindFiles(
        newbase,
        ext,
        fs.readdirSync(newbase),
        result
      );
    } else {
      if (file.endsWith(ext)) {
        result.push(newbase);
      }
    }
  }

  return result;
}


/**
 * Captures groups from regex and executes RegEx.exec() function on all.
 *
 * @param {regex} regex - Regular Expression to execute on.
 * @param {string} template - HTML Template in string.
 * @return {object} sandbox
 * @return {String[]} sandbox.matches - all matches of regex
 * @return {String} sandbox.input - input string
 */
const execRegexOnAll = (regex, template) => {
  /** allMatches holds all the results of RegExp.exec() */
  const allMatches = [];
  let match = regex.exec(template);
  if (!match) {
    return { matches: [], input: template };
  }

  const { input } = match;

  while (match !== null) {
    delete match.input;
    allMatches.push(match);
    match = regex.exec(template);
  }

  return { matches: allMatches, input };
};

module.exports = {
  recursiveFindFiles,
  execRegexOnAll
}