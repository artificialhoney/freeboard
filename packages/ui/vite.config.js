import * as path from "path";
import * as http from "http";
import * as tls from "tls";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isStatic = JSON.stringify(process.env.FREEBOARD_STATIC);
  return {
    plugins: [vue()],
    base: isStatic ? '/freeboard/' : '/',
    resolve: {
      alias: {
        "~": path.resolve(
          __dirname,
          env.FREEBOARD_NODE_MODULES || "./../../node_modules"
        ),
      },
    },
    define: {
      __FREEBOARD_VERSION__: JSON.stringify(process.env.npm_package_version),
      __FREEBOARD_STATIC__: isStatic
    },
    server: {
      proxy: {
        "/graphql": "http://localhost:4001",
        "/proxy": "http://localhost:8001",
        "/connect": "http://localhost:9001",
      },
    },
  };
});
