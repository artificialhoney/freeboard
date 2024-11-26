const esbuild = require("esbuild");
const copyStaticFiles = require("esbuild-copy-static-files");
const devServer = require("esbuild-server");
const args = process.argv.slice(2);

const config = {
  entryPoints: ["./src/index.js"],
  outfile: "./dist/app.js",
  bundle: true,
  minify: true,
  sourcemap: false,
  external: ["/img/*"],
};

const run = async () => {
  if (args.includes("--watch")) {
    esbuild.watch(config);
  } else if (args.includes("--serve")) {
    await devServer
      .createServer(config, {
        static: "public",
      })
      .start();
  } else {
    esbuild.build({
      ...config,
      plugins: [
        copyStaticFiles({
          source: "./public/*",
          destination: ".dist/",
          recursive: true,
        }),
      ],
    });
  }
};

run();
