import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
const srcDir = path.join(rootDir, "src");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

cpSync(path.join(publicDir, "index.html"), path.join(distDir, "index.html"));

if (existsSync(srcDir)) {
  cpSync(srcDir, distDir, { recursive: true });
}

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:8000";
writeFileSync(
  path.join(distDir, "config.js"),
  `window.CONDUIT_CONFIG = Object.freeze({ API_BASE_URL: "${apiBaseUrl}" });\n`,
);
