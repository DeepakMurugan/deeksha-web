import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";


export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), tanstackStart({ customViteReactPlugin: true }),    nitro(),
  react()],
});
