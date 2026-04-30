import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
      name: "lattice",
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
        // Add regexes to externalize all MUI, Emotion, and Base UI packages
        /^@mui\/.*/,
        /^@emotion\/.*/,
        /^@base-ui\/.*/,
      ],
      output: {},
    },
    outDir: "lib",
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
