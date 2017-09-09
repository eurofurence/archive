# Eurofurence Archive

This project contains the Eurofurence Archive page providing Conbooks, Websites, Daily Eurofurence issues and other resources of past conventions.

![Screenshot](screenshot.jpg)

## Usage

To host this page, you need a static webserver serving the contents of the `build` directory.

To make changes to the page, you need node and npm. [Get it here.](https://nodejs.org/en/) Also make sure to run `npm install` before attempting to run `npm run build`.

To add or modify the content of the page, e.g. to add a new convention or fix a URL to any resource, check out the `config.json` file in the `src` directory. After making the changes there, run `npm run build` to apply the changes. Afterwards, copy the files in the `build` directory to the server.

__Do not try to modify files in the build directory. They will be overwritten!__

## Development

If you want to add more features or fix bugs on the site itself, you need to follow these steps:

1. Make sure you have node and npm installed [Get it here.](https://nodejs.org/en/)
1. Clone this repository
1. Open a terminal in the root directory of this repository
1. run `npm install` (this might take a while)
1. run `npm start` (this will start a local development server on port 3000)
1. Make the changes
1. After you are satisfied, run `npm run build`
1. Commit and Push your changes



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Check out their page for a more in-depth explanation of the inner workings.