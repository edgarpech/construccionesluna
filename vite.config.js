import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    base: '/', 
    build: {
        rollupOptions: {
            output: {
            manualChunks: undefined,
            }
        },
        outDir: 'dist',
        // Agrega esta configuración para generar el 404.html
        rollupOptions: {
            input: {
            main: './index.html',
            '404': './404.html'
            }
        }
    }
    // server: {
    //     host: '0.0.0.0',
    //     port: 5173,
    // },
});
