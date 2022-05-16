import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), unocss()],
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
});
