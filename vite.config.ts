import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  root: "src",
  server: {
    port: +(process.env.PORT || 3000),
  },
  build: {
    ssr: "index.ts",
    outDir: "../dist",
    emptyOutDir: true,
    minify: true,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./app.ts",
      exportName: "viteNodeApp",
      tsCompiler: "esbuild",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
