# Fullstack Vite

Fullstack Vite is a framework that integrates back-end functionality directly into your ViteJS front-end projects, enabling seamless full-stack development in a unified environment.

## Features

- Easily integrate back-end services into ViteJS projects.
- Simplified configuration for full-stack development.
- Streamlined environment for both front-end and back-end code.

## Getting Started

### Installation

To start using Fullstack Vite, install it via npm:

```bash
npm install fullstack-vite
```

### Initialize the Project

Once installed, initialize your project using:

```bash
npx fullstack-vite init
```

### Configure Vite

After initializing, update your `vite.config.js` to include the Fullstack Vite plugin.

#### Step 1: Import Fullstack Vite

Add the following imports to your `vite.config.js`:

```javascript
import { Fullstack } from "fullstack-vite";
import { server } from "./src/server";
```

#### Step 2: Add Fullstack Plugin

In the `plugins` array of your `vite.config.js`, include the Fullstack Vite plugin:

```javascript
export default {
  plugins: [
    Fullstack({
      server,
    }),
  ],
};
```

## Usage

### Development

To run the project in development mode, use the following command. This will start the Vite development server:

```bash
npm run dev
```

### Building the Server

To build the server for production, run the following command:

```bash
npx fullstack-vite build
```

### Running the Server (Production)

Once built, you can run the server using Node.js with the following command:

```bash
node dist/server.cjs
```

## License

This project is licensed under the MIT License.
