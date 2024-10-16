#!/usr/bin/env node
const command = process.argv[2];

if (command === "init") {
  require("./init");
} else if (command === "build") require("./build");
