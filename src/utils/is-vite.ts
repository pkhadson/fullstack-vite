export default function isVite() {
  return process.env.npm_lifecycle_script?.includes("vite");
}
