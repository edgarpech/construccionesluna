<template>
    <div class="relative w-full flex flex-col md:flex-row mb-30 cursor-pointer"
         :class="{'md:flex-row-reverse': alternate}"
         @mouseenter="handleMouseEnter"
         @mouseleave="handleMouseLeave"
         @click="navigateToProject">
        
        <!-- Contenedor de imagen (fondo) -->
        <div class="md:w-1/2 h-[180px] md:h-[220px] relative overflow-hidden group">
            <!-- Imagen base con efecto de hover -->
            <img :src="imageSrc" class="w-full h-full object-cover grayscale brightness-145 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100" 
                :alt="title"
                style="object-position: center center;" />
            
            <!-- Efecto de overlay al hacer hover -->
            <div class="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
        </div>

        <!-- Contenedor de texto (superpuesto) -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div class="w-full md:w-3/5 px-6" :class="{
                'md:pr-10 md:-mr-32 text-right': !alternate,
                'md:pl-10 md:-ml-32 text-left': alternate
            }">
                <h3 class="text-2xl md:text-4xl font-medium text-white [text-shadow:_0_0_8px_rgba(0,0,0,0.8)]">
                    {{ title }}
                </h3>
                <div class="h-10 overflow-hidden" :class="{
                    'text-right': !alternate, 
                    'text-left': alternate
                }">
                    <div class="flex items-center transition-all duration-300 transform" :class="{
                        'opacity-0 -translate-y-5': !isHovered,
                        'opacity-100 translate-y-0': isHovered,
                        'justify-end': !alternate,
                        'justify-start': alternate
                    }">
                        <span class="relative inline-block">
                            <span class="text-white font-medium tracking-wide relative z-10">
                                VER DETALLES
                            </span>
                            <span class="absolute inset-0 text-transparent" style="text-shadow: 0 0 8px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.9);">
                                VER DETALLES
                            </span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="filter: drop-shadow(0 0 2px rgba(0,0,0,0.7));">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    imageSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    projectUrl: {
        type: String,
        required: true
    },
    alternate: {
        type: Boolean,
        default: false
    }
});

const router = useRouter();
const isHovered = ref(false);

function handleMouseEnter() {
    isHovered.value = true;
}

function handleMouseLeave() {
    isHovered.value = false;
}

function navigateToProject() {
    router.push(props.projectUrl);
}
</script>

<style scoped>
/* Estilos básicos */
img {
    display: block;
    user-select: none;
    -webkit-user-drag: none;
}

.h-10 {
    height: 2.5rem;
}

.overflow-hidden {
    overflow: hidden;
}

.h-\[180px\] {
    height: 180px;
}

@media (min-width: 768px) {
    .md\:h-\[220px\] {
        height: 220px;
    }
}

.cursor-pointer {
    cursor: pointer;
}

/* Asegurar que el texto sea legible */
.text-white {
    color: white;
}

/* Efecto de animación suave */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-300 {
    transition-duration: 300ms;
}
</style>