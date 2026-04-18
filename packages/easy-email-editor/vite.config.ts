import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(), // 1. Injected the React plugin for JSX/TSX compilation
  ],
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
    target: "esnext", // 2. Bumped from es2015 to esnext for modern Node/Browser support
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
        "react/jsx-runtime", // 3. Prevents React internals from being bundled into your library
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
        // 4. Mutes the legacy Dart Sass deprecation warnings from old styles
        silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
      },
    },
  },
});
