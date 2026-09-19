import path from "path"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(
          __dirname,
          "./src",
      ),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const modulePath =
              id.replaceAll("\\", "/")

          if (
              !modulePath.includes(
                  "/node_modules/",
              )
          ) {
            return
          }

          if (
              /\/(?:motion|framer-motion|motion-dom|motion-utils)\//.test(
                  modulePath,
              )
          ) {
            return "motion"
          }

          if (
              modulePath.includes(
                  "/@base-ui/",
              )
          ) {
            return "ui-vendor"
          }

          if (
              /\/(?:react|react-dom|scheduler|react-router|react-router-dom)\//.test(
                  modulePath,
              )
          ) {
            return "ui-vendor"
          }
        },
      },
    },
  },

  server: {
    headers: {
      "Cross-Origin-Opener-Policy":
          "same-origin-allow-popups",
    },

    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },

  preview: {
    headers: {
      "Cross-Origin-Opener-Policy":
          "same-origin-allow-popups",
    },
  },

  test: {
    environment: "jsdom",
  },
})