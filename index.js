const keywords = require("./keywords");

async function addLabel(context) {
  console.log(context.payload.action, context.payload.pull_request.body);

  const issues = keywords(context.payload.pull_request.body);
  if (issues.length > 0) {
    // review body information for the fixes, fixed, etc keywords.
    await issues.forEach(async issue => {
      const params = context.issue({
        number: issue,
        labels: ["in-progress"]
      });
      await context.github.issues.addLabels(params);
    });
  }
  return;
}

module.exports = robot => {
  // Your code here
  console.log("Yay, the app was loaded!");

  robot.on("pull_request.opened", addLabel);

  robot.on("pull_request.reopened", addLabel);

  robot.on("pull_request.editedf", addLabel);

  robot.on("pull_request.closed", async context => {
    console.log("CLOSED");
    // Once the PR is closed we want to remove our label from the
    // issues we had assigned as in progress
    // 1. Check that the issues were marked as fixed?
    // 2. For each issue remove the label
    return;
  });
};
