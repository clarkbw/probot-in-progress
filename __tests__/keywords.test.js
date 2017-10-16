const keywords = require("../keywords");

// https://help.github.com/articles/closing-issues-using-keywords/
const KEYWORDS = [
  "close",
  "closes",
  "closed",
  "fix",
  "fixes",
  "fixed",
  "resolve",
  "resolves",
  "resolved"
];

const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1);

describe("single keywords", () => {
  KEYWORDS.forEach(keyword => {
    test(`keyword ${keyword}`, () => {
      expect(keywords(`${keyword} #31`)).toEqual([31]);
      expect(keywords(`should ${keyword} #32 if we do it right`)).toEqual([32]);
      expect(keywords(`will ${keyword}: #33 and others`)).toEqual([33]);
    });
    test(`capitalize keyword ${capitalize(keyword)}`, () => {
      expect(keywords(`${capitalize(keyword)} #31`)).toEqual([31]);
      expect(
        keywords(`should ${capitalize(keyword)} #32 if we do it right`)
      ).toEqual([32]);
      expect(keywords(`will ${capitalize(keyword)}: #33 and others`)).toEqual([
        33
      ]);
    });
  });
});

describe("multiple keywords", () => {
  // instead of using fix, fix, fix I want to try fix, close, resolve
  // we are assuming that fix, fix, fix actually works of course
  const keywords3 = KEYWORDS.slice();
  const keywords6 = KEYWORDS.slice();
  const shift3Keywords = keywords3.concat(keywords3.splice(0, 3));
  const shift6Keywords = keywords6.concat(keywords6.splice(0, 6));
  const mKeywords = KEYWORDS.map((k, i) => [
    KEYWORDS[i],
    shift3Keywords[i],
    shift6Keywords[i]
  ]);
  mKeywords.forEach(([k1, k2, k3]) => {
    test(`keyword ${k1}, ${k2}, ${k3}`, () => {
      expect(keywords(`${k1} #31, ${k2} #32, and ${k3} #33`)).toEqual([
        31,
        32,
        33
      ]);
      // OXFORD!
      expect(keywords(`${k1} #31, ${k2} #32 and ${k3} #33`)).toEqual([
        31,
        32,
        33
      ]);
      expect(
        keywords(
          `should ${k1} #32 and ${k2} #33 and ${k3} #34 if we do it right`
        )
      ).toEqual([32, 33, 34]);
      expect(
        keywords(`will ${k1}: #33; ${k2}: #34; ${k3}: #35 and others`)
      ).toEqual([33, 34, 35]);
    });
  });
});
