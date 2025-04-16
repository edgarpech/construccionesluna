<template>
    <div class="relative w-full flex flex-col md:flex-row mb-30" :class="{'md:flex-row-reverse': alternate}">
        <!-- Contenedor de texto -->
        <div class="md:w-3/5 flex flex-col justify-center px-6 relative z-10" :class="{
            'md:pr-10 md:-mr-32 md:text-right': !alternate,
            'md:pl-10 md:-ml-32 md:text-left': alternate
        }">
            <h3 class="text-2xl md:text-4xl font-medium text-[#000000] transition-all duration-500"
                :class="{ 'text-glow': isHovered || buttonHovered}">
                {{ title }}
            </h3>
            <div class="h-10 overflow-hidden" :class="{'text-right': !alternate, 'text-left': alternate}">
                <a :href="projectUrl" class="flex items-center transition-all duration-300 group" :class="{
                    'opacity-100 translate-y-0 justify-end': (isHovered || buttonHovered) && !alternate,
                    'opacity-100 translate-y-0 justify-start': (isHovered || buttonHovered) && alternate,
                    'opacity-0 -translate-y-full justify-end': !isHovered && !buttonHovered && !alternate,
                    'opacity-0 -translate-y-full justify-start': !isHovered && !buttonHovered && alternate
                }" @mouseenter="buttonHovered = true" @mouseleave="buttonHovered = false">
                    <span class="relative inline-block">
                        <!-- Texto principal con borde simulado -->
                        <span class="text-white font-medium tracking-wide relative z-10 group-hover:text-gray-300">
                            VER DETALLES
                        </span>
                        <!-- Sombra de texto para mayor contraste -->
                        <span class="absolute inset-0 text-transparent" style="text-shadow: 0 0 8px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.9);">
                            VER DETALLES
                        </span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2 text-white group-hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="filter: drop-shadow(0 0 2px rgba(0,0,0,0.7));">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </a>
            </div>
        </div>

        <!-- Contenedor de imagen -->
        <div class="md:w-1/2 h-[180px] md:h-[220px] relative overflow-hidden cursor-pointer" ref="container"
            @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove"
            @click="navigateToProject">
            <!-- Imagen base -->
            <img :src="imageSrc" class="w-full h-full object-cover grayscale brightness-145" :alt="title"
                style="object-position: center center;" />

            <!-- Capa transparente para extender el área de hover -->
            <div class="absolute inset-0 z-20" :style="{
            left: alternate ? '66%' : '-66%',
            width: '166%',
            background: 'transparent'
          }"></div>

            <!-- Efecto de revelado de color -->
            <div class="absolute inset-0 pointer-events-none mix-blend-normal z-10" :style="{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
            maskImage: `radial-gradient(circle ${magnifierSize/2}px at ${mouseX}px ${mouseY}px, white 0%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(circle ${magnifierSize/2}px at ${mouseX}px ${mouseY}px, white 0%, transparent 80%)`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
          }">
                <img :src="imageSrc" class="w-full h-full object-cover" style="object-position: center center;" :style="{
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))',
              clipPath: cloudPath,
              WebkitClipPath: cloudPath
            }" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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

const isHovered = ref(false);
const buttonHovered = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const magnifierSize = ref(300);
const container = ref(null);

const cloudPath = computed(() => {
    const centerX = mouseX.value;
    const centerY = mouseY.value;
    const radius = magnifierSize.value / 2;

    const points = [];
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const variation = 0.6 + Math.random() * 0.8;
        points.push([
            centerX + Math.cos(angle) * radius * variation,
            centerY + Math.sin(angle) * radius * variation
        ]);
    }

    return `path('M ${points.map(p => `${p[0]},${p[1]}`).join(' ')} Z')`;
});

function handleMouseEnter() {
    isHovered.value = true;
}

function handleMouseMove(e) {
    if (!container.value) return;

    const rect = container.value.getBoundingClientRect();
    mouseX.value = Math.max(0, e.clientX - rect.left);
    mouseY.value = Math.max(0, e.clientY - rect.top);
  }
  
  function handleMouseLeave() {
    isHovered.value = false;
    mouseX.value = 0;
    mouseY.value = 0;
  }
  
  function navigateToProject() {
    window.location.href = props.projectUrl;
  }
  </script>
  
  <style scoped>
/* Estilos se mantienen igual */
img {
    display: block;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
}

.text-glow {
    text-shadow:
        0 0 8px rgba(255, 255, 255, 0.4),
        0 0 16px rgba(255, 255, 255, 0.3),
        0 0 24px rgba(255, 255, 255, 0.2);
    transition: text-shadow 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.text-outline {
    text-shadow:
        0.5px 0.5px 1px #000,
        -0.5px -0.5px 1px #000,
        0.5px -0.5px 1px #000,
        -0.5px 0.5px 1px #000;
}

.icon-shadow {
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.8));
}

a {
    will-change: transform, opacity;
    transition:
        opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1),
        transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
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
</style>