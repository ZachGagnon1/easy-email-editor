import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Replaced deprecated @vitejs/plugin-react-refresh
import path from "path";

export default defineConfig({
  server: {
    fs: {
      strict: false,
    },
    // Vite 8 feature: optionally forward console logs to terminal
    forwardConsole: true,
  },
  resolve: {
    // Vite 8 built-in support for tsconfig path resolution
    tsconfigPaths: true,
    alias: {
      // Maintaining your specific overrides for package boundaries
      "easy-email-editor/lib/style.css": path.resolve(
        __dirname,
        "package.json"
      ),
      "easy-email-extensions/lib/style.css": path.resolve(
        __dirname,
        "package.json"
      ),
      react: path.resolve("./node_modules/react"),
      "react-final-form": path.resolve(
        __dirname,
        "./node_modules/react-final-form"
      ),
      "@demo": path.resolve(__dirname, "./src"),
      "@extensions": path.resolve("../packages/easy-email-extensions/src"),
      "@core": path.resolve("../packages/easy-email-core/src"),
      "@arco-themes": path.resolve("./node_modules/@arco-themes"),
      "@": path.resolve("../packages/easy-email-editor/src"),
      "easy-email-core": path.resolve(
        "../packages/easy-email-core/src/index.tsx"
      ),
      "easy-email-editor/lib/locales.json": path.resolve(
        "../packages/easy-email-editor/public/locales.json"
      ),
      "easy-email-localization": path.resolve(
        "../packages/easy-email-localization"
      ),
      "easy-email-editor": path.resolve(
        "../packages/easy-email-editor/src/index.tsx"
      ),
      "easy-email-extensions": path.resolve(
        "../packages/easy-email-extensions/src/index.tsx"
      ),
      "@arco-design/web-react/dist/css/arco.css": path.resolve(
        "./node_modules/@arco-design/web-react/dist/css/arco.css"
      ),
    },
  },
  // Note: define: {} is standard, but Vite 8 handles env vars more robustly
  define: {},
  esbuild: {
    // Arco design style injection
    jsxInject: 'import "@arco-design/web-react/dist/css/arco.css";',
  },
  build: {
    // In Vite 8, lightningcss is the default for high-performance minification
    // If you still want Terser, ensure 'terser' is installed in your devDependencies
    minify: "terser",
    manifest: true,
    sourcemap: true,
    // Modernized build target; Vite 8 defaults to newer baselines
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/html2canvas")) return "html2canvas";
          if (id.includes("node_modules/lodash")) return "lodash";
          if (id.includes("node_modules/mjml-browser")) return "mjml-browser";
          if (id.includes("easy-email")) return "easy-email-editor";
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: "dashes",
    },
    preprocessorOptions: {
      scss: {},
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    // Replaced vite-plugin-html with native transform hook
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(
          "</head>",
          `<meta name="updated-time" content="${new Date().toUTCString()}" />\n</head>`
        );
      },
    },
  ],
});
