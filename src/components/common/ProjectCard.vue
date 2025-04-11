<template>
    <div class="relative w-full flex flex-col md:flex-row mb-20">
      <!-- Contenedor de imagen (derecha) - Área interactiva principal -->
      <div 
        class="md:w-1/2 h-[180px] md:h-[220px] relative overflow-hidden order-1 md:order-2 cursor-pointer"
        ref="container"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousemove="handleMouseMove"
      >
        <!-- Imagen base -->
        <img 
          :src="imageSrc" 
          class="w-full h-full object-cover grayscale brightness-125" 
          :alt="title"
          style="object-position: center center;"
        />
        
        <!-- Efecto de revelado de color -->
        <div 
          class="absolute inset-0 pointer-events-none mix-blend-normal"
          :style="{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
            maskImage: `radial-gradient(circle ${magnifierSize/2}px at ${mouseX}px ${mouseY}px, white 0%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(circle ${magnifierSize/2}px at ${mouseX}px ${mouseY}px, white 0%, transparent 80%)`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
          }"
        >
          <img 
            :src="imageSrc" 
            class="w-full h-full object-cover"
            style="object-position: center center;"
            :style="{
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))',
              clipPath: cloudPath,
              WebkitClipPath: cloudPath
            }"
          />
        </div>
      </div>
  
      <!-- Contenedor de texto (izquierda) - Solo visual, no interactivo -->
      <div 
        class="md:w-3/5 flex flex-col justify-center pr-0 md:pr-10 order-2 md:order-1 relative z-10 md:-mr-32 pointer-events-none"
      >
        <h3 
          class="text-2xl md:text-4xl font-medium text-[#000000] text-right transition-all duration-500"
          :class="{'text-glow': isHovered}"
        >
          {{ title }}
        </h3>
        <div class="text-right px-6 h-10 overflow-hidden">
          <button 
            class="flex items-center justify-end text-[#000000] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] pointer-events-auto"
            :class="{
              'opacity-100 translate-y-0': isHovered, 
              'opacity-0 -translate-y-full': !isHovered
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            VER DETALLES
          </button>
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
    }
  });
  
  const isHovered = ref(false);
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
    mouseX.value = e.clientX - rect.left;
    mouseY.value = e.clientY - rect.top;
  }
  
  function handleMouseLeave() {
    isHovered.value = false;
    mouseX.value = 0;
    mouseY.value = 0;
  }
  </script>
  
  <style scoped>
  /* Estilo para la imagen */
  img {
    display: block;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }
  
  /* Efecto glow suave para el título */
  .text-glow {
    text-shadow: 
      0 0 5px rgba(255, 255, 255, 0.2),
      0 0 10px rgba(255, 255, 255, 0.15),
      0 0 15px rgba(255, 255, 255, 0.1);
    transition: text-shadow 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  
  /* Animación vertical suave para el botón */
  button {
    will-change: transform, opacity;
    transition: 
      opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1),
      transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  
  /* Contenedor para evitar overflow */
  .h-10 {
    height: 2.5rem;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  
  /* Formato rectangular para imagen */
  .h-\[180px\] {
    height: 180px;
  }
  @media (min-width: 768px) {
    .md\:h-\[220px\] {
      height: 220px;
    }
  }
  
  /* Superposición del texto */
  .md\:-mr-32 {
    margin-right: -8rem;
  }
  
  /* Cursor pointer solo en la imagen */
  .cursor-pointer {
    cursor: pointer;
  }
  
  /* Permitir eventos solo en el botón */
  .pointer-events-none {
    pointer-events: none;
  }
  .pointer-events-auto {
    pointer-events: auto;
  }
  </style>