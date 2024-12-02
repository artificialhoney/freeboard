import * as path from "path";
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
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      proxy: {
        "/graphql": env.FREEBOARD_BACKEND_URL || "http://localhost:4000",
      },
    },
  };
});
