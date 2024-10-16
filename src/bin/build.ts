import esbuild from "esbuild";
import { join } from "path";
import { createSpinner } from "nanospinner";
import { error } from "console";

const spinner = createSpinner("Building project...", { color: "blue" }).start();

const cwd = process.cwd();

(async () => {
  try {
    await esbuild.build({
      entryPoints: [join(cwd, "src", "server.ts")],
      bundle: true,
      outfile: "dist/server.cjs",
      platform: "node",
      format: "cjs",
      sourcemap: true,
    });
  } catch (error) {
    console.error(error);
  } finally {
    spinner.clear();
    spinner.stop();
    console.log("✔️  Project builded!");
  }
})();
