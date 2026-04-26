import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Added __dirname to ensure the path resolves correctly across different OS environments
      "easy-email-core": path.resolve(__dirname, "../easy-email-core"),
    },
  },
  define: {},
  build: {
    emptyOutDir: false,
    minify: true,
    cssMinify: "esbuild",
    manifest: false,
    sourcemap: true,
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "easy-email-editor",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      plugins: [],
      external: [
        "react",
        "react-dom",
        "react-dom/server",
        "react/jsx-runtime",
        "mjml-browser",
        "react-final-form",
        "easy-email-core",
      ],
      output: {},
    },
    outDir: "lib",
  },
  optimizeDeps: {
    include: ["easy-email-core"],
  },
  css: {
    modules: {
      localsConvention: "dashes",
    },
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
      },
    },
  },
});
