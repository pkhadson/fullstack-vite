import fs from "fs";
import path from "path";
import {
  HELLO_SERVICE_TS,
  INDEX_TS,
  SERVER_TS,
  VITE_CONFIG_TS_IMPORT,
  VITE_CONFIG_TS_SERVER,
} from "./initialFiles";
import { createFileWithDirectories } from "../utils/file";
import { createSpinner } from "nanospinner";
import sleep from "../utils/sleep";
import HJON from "hjson";

const spinner = createSpinner("").start();

const cwd = process.cwd();

// const spinner = ora("Loading unicorns");
// spinner.start();

(async () => {
  console.log("Creating initial files...");

  await sleep(300);

  const serverTsPath = path.join(cwd, "src/server.ts");
  createFileWithDirectories(serverTsPath, SERVER_TS);

  await sleep(300);

  console.log("✔️  src/server.ts");

  const helloServiceTsPath = path.join(cwd, "src/services/hello.service.ts");
  createFileWithDirectories(helloServiceTsPath, HELLO_SERVICE_TS);

  await sleep(300);

  console.log("✔️  src/services/hello.service.ts");

  const indexTsPath = path.join(cwd, "src/services/index.ts");
  createFileWithDirectories(indexTsPath, INDEX_TS);
  await sleep(300);

  console.log("✔️  src/services/index.ts");

  await sleep(200);

  console.log("Creating initial files... Done!");
  await sleep(300);

  spinner.stop({ text: "All files created!", mark: ":O", color: "magenta" });

  console.log("\nNow, add the following code to your `vite.config.ts` file:\n");
  console.log("1. Import the `Fullstack` plugin and the `services` object:");
  console.log(VITE_CONFIG_TS_IMPORT);
  console.log("\n\n2. Add the `Fullstack` plugin to the `plugins` array:");
  console.log(VITE_CONFIG_TS_SERVER);

  // update tsconfig.node.json if it exists, add     "src/services/**/*", "src/server.*" into include
  const tsconfigNodePath = path.join(cwd, "tsconfig.node.json");
  if (fs.existsSync(tsconfigNodePath)) {
    const tsconfigNode = HJON.parse(fs.readFileSync(tsconfigNodePath, "utf-8"));
    tsconfigNode.include.push("src/services/**/*", "src/server.*");
    fs.writeFileSync(tsconfigNodePath, JSON.stringify(tsconfigNode, null, 2));
  }
})();
