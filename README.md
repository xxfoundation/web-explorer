# xxscan
xx network web app to display in chain data

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Execute the lints in the source code

#### vscode integration

Just install the `eslint` plugin to validate the code

You can this configuration to the project settings
``` json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.organizeImports": true
    }
}
```

## git hooks

The project uses them to enforce code style. But in some cases, like when pushing the code just a backup and stopping working for the day for these cases, you can call the commit and push as follows

``` sh
git commit -m "yolo!" --no-verify
HUSKY=0 git push
```