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

/**
 * Returns value of the flag in CLI
 * @param {String} flag flag to retrive value (e.g --type)
 */
function flagValue(flag) {
  if (!process.argv.includes(flag)) {
    return null;
  }

  if (process.argv.indexOf(flag) === process.argv.length) {
    return undefined;
  }

  return process.argv[process.argv.indexOf(flag) + 1];
}

const grey = (message) => `\u001b[90m${message}\u001b[39m`;

module.exports = {
  execRegexOnAll,
  flagValue,
  grey
}