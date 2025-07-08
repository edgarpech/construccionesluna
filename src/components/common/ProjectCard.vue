<template>
    <div 
        class="relative w-full flex flex-col md:flex-row mb-30"
        :class="{
            'md:flex-row-reverse': alternate, 
            'flex-col': isMobileView,
            'cursor-pointer': hasProjectUrl,
            'cursor-not-allowed': !hasProjectUrl
        }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @click="navigateToProject"
    >
        <!-- Contenedor de texto (superpuesto o arriba en móvil) -->
        <div 
            v-if="isMobileView" 
            class="w-full px-0 md:px-6 text-center mb-4"
        >
            <h3 class="text-lg font-medium text-black">
                {{ title }}
            </h3>
            <!-- indicador móvil dinámico -->
            <div v-if="isMobileView && hasProjectUrl" class="flex items-center justify-center mt-2 animate-bounce">
                <span class="text-sm font-medium text-gray-700 mr-1">
                    Toca para ver detalles
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
            <!-- si es movil pero no hay url, colocar PROXIMAMENTE -->
            <div v-else-if="isMobileView && !hasProjectUrl" class="flex items-center justify-center mt-2">
                <span class="text-sm font-medium text-gray-700">
                    PRÓXIMAMENTE
                </span>
            </div>
        </div>

        <!-- Contenedor de imagen (fondo) -->
        <div 
            class="md:w-1/2 h-[180px] md:h-[220px] relative overflow-hidden group"
            :class="{
                'shadow-md': isMobileView,
                'hover:shadow-lg': !isMobileView && hasProjectUrl
            }"
        >
            <!-- Imagen base con efecto de hover -->
            <img loading="lazy"
                v-lazy="imageSrc" 
                class="w-full h-full object-cover transition-all duration-300"
                :class="{
                    'grayscale group-hover:grayscale-0': !isMobileDevice,
                    'grayscale': !hasProjectUrl
                }"
                :alt="title"
                style="object-position: center center;" 
            />
            
            <!-- Efecto de overlay al hacer hover -->
            <div 
                v-if="!isMobileDevice && hasProjectUrl" 
                class="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20"
            ></div>
        </div>

        <!-- Contenedor de texto (superpuesto) -->
        <div 
            v-if="!isMobileView" 
            class="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
            <div 
                class="w-full md:w-3/5 px-6" 
                :class="{
                    'md:pr-10 md:-mr-32 text-right': !alternate,
                    'md:pl-10 md:-ml-32 text-left': alternate
                }"
            >
                <h3 class="text-2xl md:text-4xl font-medium text-black [text-shadow:_0_0_8px_rgba(255,255,255,0.8)]">
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
                            <span class="text-black font-extrabold tracking-wide relative z-10">
                                {{ hasProjectUrl ? 'VER DETALLES' : 'PRÓXIMAMENTE' }}
                            </span>
                            <span class="absolute inset-0 text-transparent font-extrabold">
                                {{ hasProjectUrl ? 'VER DETALLES' : 'PRÓXIMAMENTE' }}
                            </span>
                        </span>
                        <svg v-if="hasProjectUrl" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="filter: drop-shadow(0 0 2px rgba(0,0,0,0.7));">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
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
        default: null
    },
    alternate: {
        type: Boolean,
        default: false
    }
});

const router = useRouter();
const isHovered = ref(false);
const isMobileDevice = ref(false);
const isMobileView = ref(false);

const hasProjectUrl = computed(() => {
    return props.projectUrl !== null && props.projectUrl !== undefined;
});

function handleMouseEnter() {
    if (!isMobileDevice.value) {
        isHovered.value = true;
    }
}

function handleMouseLeave() {
    if (!isMobileDevice.value) {
        isHovered.value = false;
    }
}

function navigateToProject() {
    if (hasProjectUrl.value) {
        router.push(props.projectUrl);
    }
}

function detectMobileDevice() {
    isMobileDevice.value = /Mobi|Android/i.test(window.navigator.userAgent);
}

function handleResize() {
    isMobileView.value = window.innerWidth <= 768;
}

onMounted(() => {
    detectMobileDevice();
    handleResize();
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
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

@media (max-width: 768px) {
    .cursor-pointer:active {
        transform: scale(0.98);
        opacity: 0.9;
        transition: transform 0.1s ease, opacity 0.1s ease;
    }
    
    .cursor-pointer {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
    }
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