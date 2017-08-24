# Eurofurence Archive

This project contains the Eurofurence Archive page providing Conbooks, Websites and Daily Eurofurence issues of past conventions.

## Usage

To host this page, you need a static webserver serving the contents of the `build` directory.

To add or modify the content of the page, e.g. to add a new convention or fix a URL to any resource, check out the `config.json` file in the `public` directory. __Do not change the `config.json` file in the build directory. It will be overwritten!__ (_That being said, you can of course change the `config.json` you put on the server to make a quick-fix without building the project. Just keep in mind that this change might be overwritten when you ever upgrade to a new version._)

## Development

If you just want to add new conventions or Daily Eurofurence Issues, you can do that by modifying the `config.json` file (see above).

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