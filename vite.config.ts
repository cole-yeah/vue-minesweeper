import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vue-minesweeper/",
  plugins: [vue(), unocss()],
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },
});
