import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(), // 1. Added the React plugin to process your block JSX/TSX components
  ],
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "./src"),
    },
  },
  define: {},
  build: {
    emptyOutDir: false,
    minify: true, // Handled blazingly fast by Vite 8's Rolldown
    manifest: false,
    sourcemap: true,
    target: "esnext", // 2. Bumped from es2015 to modern esnext
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "easy-email-core",
      formats: ["es", "cjs"],
      fileName: (mod) => `index.${mod}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-dom/server",
        "react/jsx-runtime", // 3. CRITICAL: Prevents React 18/19's JSX engine from bundling
        "lodash",
        // Let uuid library handle how to use its crypto module depending on the environment
        "uuid",
      ],
    },
    outDir: "lib",
  },
  optimizeDeps: {
    include: [],
  },
});
