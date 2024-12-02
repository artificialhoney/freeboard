import * as path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      inject({
        $: "jquery",
        jQuery: "jquery",
      }),
      vue(),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./../../node_modules"),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      proxy: {
        "/graphql": "http://localhost:4000",
      },
    },
  };
});
