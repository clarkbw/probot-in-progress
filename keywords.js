// keywords.js

const debug = require("debug")("keywords");

// find matches across the body of the PR
// like fixes #45, fixes: #36, etc
const GLOBAL_REGEX = /\b(close[sd]?|fix|fixe[sd]?|resolve[sd]?)\s*:?\s*#(\d+),*/gi;
// find local matches like 'fixes #45'
const LOCAL_REGEX = /\b(close[sd]?|fix|fixe[sd]?|resolve[sd]?)\s*:?\s*#(\d+)/i;

module.exports = body => {
  const foundKeywords = GLOBAL_REGEX.test(body);
  debug("regex test %s", foundKeywords);
  if (foundKeywords) {
    const bodyMatches = body.match(GLOBAL_REGEX);
    debug("bodyMatches", bodyMatches);
    const localMatches = bodyMatches.map(m => m.match(LOCAL_REGEX));
    debug("localMatches", localMatches);
    const reducedIssues = localMatches.map(m =>
      m.reduce((p, c) => {
        debug("reduce p=%O, c=%s", p, c, !isNaN(c));
        if (c !== null && !isNaN(c)) {
          p.push(+c);
        }
        return p;
      }, [])
    );
    debug("reducedIssues", reducedIssues);
    const flattenedIssues = reducedIssues.reduce((a, b) => a.concat(b), []);
    debug("flattenedIssues", flattenedIssues);
    return flattenedIssues;
  }
};
