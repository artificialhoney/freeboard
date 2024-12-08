import * as path from "path";
import * as http from "http";
import * as tls from "tls";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "~": path.resolve(
          __dirname,
          env.FREEBOARD_NODE_MODULES || "./../../node_modules",
        ),
      },
    },
    define: {
      __FREEBOARD_VERSION__: JSON.stringify(process.env.npm_package_version),
      __FREEBOARD_BACKEND_URL__: JSON.stringify(
        process.env.FREEBOARD_BACKEND_URL || "http://localhost:4001",
      ),
      __FREEBOARD_PROXY_URL__: JSON.stringify(
        process.env.FREEBOARD_PROXY_URL || "http://localhost:8001",
      ),
    },
  };
});
