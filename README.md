# <img style="vertical-align: bottom" src="./src/assets/favicon-32x32.png"> React Template 

> My template for React projects.

### Built With

- React
- Redux
- RxJS
- Webpack
- Express
- Sass

## Developing

---

### Prerequisites

Specified in the `engines` in `package.json`

- Node.js (**12.16.1**)
- Yarn (**1.22.4**)

---

### Setting up Dev

Clone the project and install the dependencies.
Then copy the .env.example to .env and fill in your env configuration.

```shell
git clone https://github.com/AlexGavalas/react-template.git
cd react-template
yarn
cp .env.example .env
```

Now you can run `yarn start` to start the development runtime environment.

---

### Configuration

Put your configuration/environment variables in the `.env` file. *This file should not be committed.*

This project uses these env vars:

`SERVER_PORT` The port where the express server will listen

---

### Building

To generate a production build run `yarn build`

---

## Tests

**TODO: Add tests**

```shell
yarn test
```

---

## Style guide

This project uses `eslint` and `stylelint` for code style.
See respective configuration files for details.
