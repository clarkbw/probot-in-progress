// Requiring probot allows us to mock out a robot instance
const { createRobot } = require("probot");
// Create a fixtures folder in your test folder
// Then put any larger testing payloads in there
// const payload = require('./fixtures/payload');

describe("your-app", () => {
  let robot;
  let github;

  beforeEach(() => {
    // Here we create a robot instance
    robot = createRobot();
    // Here we initialize the app on the robot instance
    app(robot);
    // This is an easy way to mock out the GitHub API
    github = {
      issues: {
        createComment: jest.fn(() => Promise.resolve())
      }
    };
    // Passes the mocked out GitHub API into out robot instance
    robot.auth = () => Promise.resolve(github);
  });

  describe("your functionality", () => {
    it("performs an action", async () => {
      // Simulates delivery of a payload
      await robot.receive(payload);
      // This test would pass if in your main code you called `context.github.issues.createComment`
      expect(github.issues.createComment).toHaveBeenCalled();
    });
  });
});
