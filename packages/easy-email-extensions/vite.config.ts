/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    // 1. Added the modern React plugin (required for React 19)
    react(),
    process.env.ANALYZE === "true" &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      // 2. Added __dirname to ensure paths resolve perfectly across OS environments
      "@extensions": path.resolve(__dirname, "./src"),
      "easy-email-core": path.resolve(__dirname, "../easy-email-core/lib"),
      "easy-email-editor": path.resolve(__dirname, "../easy-email-editor/lib"),
    },
  },
  build: {
    emptyOutDir: false,
    minify: true,
    // Vite 8 uses Rolldown for this, which is blazingly fast
    sourcemap: true,
    target: "esnext",
    // 3. Bumped from es2015. Modern browsers and Node 20+ handle esnext natively.
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "easy-email-extension",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        // 4. CRITICAL: Prevents React 19's JSX runtime from being bundled into your library
        "mjml-browser",
        "react-final-form",
        // <-- TODO: Remove this once you finish swapping to React Hook Form
        "easy-email-core",
        "easy-email-editor",
        "uuid",
      ],
    },
    outDir: "lib",
  },
  css: {
    modules: {
      localsConvention: "dashes",
    },
    preprocessorOptions: {
      scss: {
        // Mutes the legacy Dart Sass deprecation warnings from Arco Design's old stylesheets
        silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
