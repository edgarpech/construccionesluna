import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import sitemap from 'vite-plugin-sitemap';

// Rutas dinámicas para prerender y sitemap
const dynamicRoutes = [
    '/proyectos/alberca',
    '/proyectos/condominio',
    '/proyectos/elevador',
    '/proyectos/fachada',
    '/proyectos/muebles',
];

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        tailwindcss(), 
        sitemap({
            hostname: 'https://construccionesluna.com.mx',
            dynamicRoutes,
            changefreq: 'weekly',
            priority: 0.8,
        }),
        viteStaticCopy({
            targets: [
                { src: './public/_redirects', dest: './' }
            ]
        })
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
    build: {
        minify: true, // Minificación activada
        outDir: 'dist',
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].[hash].js`,
                assetFileNames: `assets/[name].[hash].[ext]`
            }
        }
    }
});
