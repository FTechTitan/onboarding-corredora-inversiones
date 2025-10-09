import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './', // Rutas relativas para evitar bloqueo de firewall corporativo
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    assetsDir: 'app-resources', // Cambiar a path completamente nuevo para evitar historial de Zscaler
    rollupOptions: {
      output: {
        assetFileNames: 'app-resources/[name]-[hash][extname]',
        chunkFileNames: 'app-resources/bundle-[hash].js',
        entryFileNames: 'app-resources/bundle-[hash].js'
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
