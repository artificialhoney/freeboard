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
    },
    server: {
      proxy: {
        "/graphql": "http://localhost:4001",
        "/proxy": {
          target: "http://localhost:8001",
          rewrite: (path) => path.replace("/proxy/", ""),
        },
        "/cables/api": {
          target: "http://cables.gl",
          changeOrigin: true,
          rewrite: (path) => path.replace("/cables", ""),
        },
        "/cables": {
          target: "http://localhost:9090",
          rewrite: (path) => path.replace("/cables", ""),
        },
        "js/libs.ui.js": {
          target: "http://localhost:9090"
        },
        "js/libs.ui.js": {
          target: "http://localhost:9090"
        }
      }
    },
  };
});
