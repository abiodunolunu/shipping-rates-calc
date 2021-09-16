import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    https: {
      key: path.resolve(__dirname, "./localhost-key.pem"),
      cert: path.resolve(__dirname, "./localhost.pem"),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
