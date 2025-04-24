import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import sitemap from 'vite-plugin-sitemap';

// Rutas dinámicas para prerender y sitemap
const dynamicRoutes = [
    '/',
    '/proyectos/alberca',
    '/proyectos/condominio',
    '/proyectos/elevador',
    '/proyectos/fachada',
    '/proyectos/muebles',
];

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(), 
        sitemap({
            hostname: 'https://construccionesluna.com.mx',
            dynamicRoutes,
            changefreq: 'weekly',
            priority: 0.8,
            // Generar automáticamente etiquetas <image:image>
            transform(route, config) {
                if (route.img) {
                    return {
                        ...route,
                        images: route.img.map(image => ({
                            loc: image.loc,
                            title: image.title,
                        })),
                    };
                }
                return route;
            },
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
        outDir: 'dist',
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].[hash].js`,
                assetFileNames: `assets/[name].[hash].[ext]`
            }
        }
    }
});
