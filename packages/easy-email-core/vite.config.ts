import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
    target: "esnext",
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
        "react/jsx-runtime",
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
