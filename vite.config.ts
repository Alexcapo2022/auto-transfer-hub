// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Configuración para GitHub Pages
export default defineConfig({
  base: "/",  // Asegúrate de que esta ruta coincida con el nombre de tu repositorio en GitHub
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});
