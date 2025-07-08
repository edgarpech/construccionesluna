<template>
    <router-view v-slot="{ Component, route }">
        <transition
            :name="route.meta.transition || 'fade'"
            mode="out-in"
            @before-enter="beforeEnter"
            @after-enter="afterEnter"
        >
            <component :is="Component" />
        </transition>
    </router-view>
</template>
  
<script>
    import { useHead } from '@vueuse/head'
    export default {
        name: 'App',
        setup() {
            useHead({
                meta: [
                    {
                    name: 'keywords',
                    content: 'construcción, diseño, innovación, mantenimiento, acabados, servicios de construcción, electricidad, instalaciones eléctricas, instalación eléctrica residencial, instalación eléctrica comercial, plomería, fugas de agua, reparación de tuberías, instalación sanitaria, sistemas de drenaje, tablaroca, muros de tablaroca, plafones, colocación de plafones, muros divisorios, pasta, aplicación de pasta texturizada, pintura, pintura residencial, pintura industrial, pintura en interiores, pintura en exteriores, albañilería, reparación de muros, acabados finos, acabados interiores, acabados exteriores, impermeabilizaciones, impermeabilización prefabricada, impermeabilización en techos, reparación de goteras, aire acondicionado, instalación de minisplits, mantenimiento de aire acondicionado, revisión de clima, ventanería, ventanería de aluminio, ventanas de aluminio, puertas de aluminio, cancelería, canceles de baño, canceles residenciales, pisos cerámicos, colocación de pisos, pisos importados, pisos nacionales, colocación de loseta, colocación de azulejos, remodelación, remodelación de casas, remodelación de oficinas, renovación de espacios, reformas residenciales, reformas comerciales, servicios generales, contratistas, mano de obra calificada, empresas de construcción, constructoras en Mérida, servicios de mantenimiento en Mérida, plomeros en Mérida, electricistas en Mérida, remodelaciones en Mérida, acabados profesionales en Mérida, construcción segura, construcción duradera, construcción eficiente, servicios integrales, servicios residenciales, servicios comerciales, soluciones en construcción, arquitectura funcional, decoración de interiores, proyectos llave en mano',
                    }
                ]
            })

            const beforeEnter = () => {
                document.body.style.overflow = 'hidden'
            }
        
            const afterEnter = () => {
                document.body.style.overflow = ''
            }
        
            return { beforeEnter, afterEnter }
        }
    }
</script>
  
<style>
    /* Transiciones mejoradas */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }
  
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
  
    .slide-up-enter-active {
        transition: all 0.7s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
    
    .slide-up-leave-active {
        transition: all 0.5s cubic-bezier(0.5, 0, 0.5, 1);
    }
    
    .slide-up-enter-from {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .slide-up-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
  
    /* Bloquea el scroll durante la transición */
    body {
        overflow-x: hidden;
    }
</style>