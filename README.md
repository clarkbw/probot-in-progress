# in-progress

> a GitHub App built with [probot](https://github.com/probot/probot) that automatically labels issues with the `in-progress` label when an open PR uses the [GitHub issue keywords](https://help.github.com/articles/closing-issues-using-keywords/)

## How it works

When you use [github keywords](https://help.github.com/articles/closing-issues-using-keywords/) like `fixes`, `resolves`, `closes`, and other variants in your PR GitHub will automatically close the referenced issues once the PR is closed.  That's great!

<img width="774" alt="screen shot 2017-10-16 at 1 53 10 pm" src="https://user-images.githubusercontent.com/2134/31634812-8fb26534-b279-11e7-9ad3-511e01fcd2fb.png">

This Probot will also tag the referenced issues with a custom label `in-progress` so you can more easily see the issues which are currently being worked on.

<img width="471" alt="screen shot 2017-10-16 at 1 53 28 pm" src="https://user-images.githubusercontent.com/2134/31634803-899420fc-b279-11e7-9eb5-6f8a81127f87.png">

:tada:

## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.
