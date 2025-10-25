import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                            @use "@/assets/styles/scss/_fonts" as *;
                            @use "@/assets/styles/scss/_resets" as *;
                            @use "@/assets/styles/scss/_mixins" as *;
                            @use "@/assets/styles/scss/_variables" as *;
                          `,
      },
    },
  },
});
