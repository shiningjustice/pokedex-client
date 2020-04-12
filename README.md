# React Boilerplate

This is a boilerplate project used for starting new projects!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up
Complete the following steps to start a new project (`NEW-PROJECT-NAME`):

1. Clone this repository to your local machine `git clone https://github.com/shiningjustice/react-boilerplate <NEW-PROJECT-NAME>`. 
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file (rename) to `.env.local` that will be ignored by git and read by the express server `mv example.env .env.local`. Update any relevant info.
6. Edit the contents of the package.json to use `<NEW-PROJECT-NAME>` instead of `"name": "pokedex-client",` (line 2), and in the `npm run deploy` script (line 18).
7. Edit the contents of the now.json to use `<NEW-PROJECT-NAME>`.
8. Edit the contents of the manifest.json to use `<NEW-PROJECT-NAME>`. 
8. Make sure to update the HTML file (description and icons), `./public` folder, and manifest.json (favicons and icons).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run deploy`

The `npm run deploy` script automates pre-build testing, building, and deployment:

```
{
  // ...
  "prebuild": "CI=true react-scripts test --colors",
  "build": "react-scripts build",
  "predeploy": "npm run build",
  "deploy": "now --prod <NEW-PROJECT-NAME> ./build",
  "test": "react-scripts test",
  // ...
}
```

#### npm run prebuild:
`"CI=true react-scripts test --colors"`

This runs the tests with Continuous Integration (CI). The CI variable signals to do testing while:
1. disabling watch mode
2. making test output error "exit code" on test fail, preventing the subsequent scripts from running
3. enabling colors in the test output (`CI=true` originally disables it but the `--colors` flag overrides it)

#### npm run build
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

You can test your build with `npx serve -s build`.

#### npm run deploy
Deploys to Zeit.

If you haven't already [download Zeit now CLI tool](https://zeit.co/download) to install the npm package. You can run now --version to verify that it downloaded correctly.


### More Info from the Create-React-App README: 

#### Other scripts

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
