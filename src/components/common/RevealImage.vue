<template>
    <div ref="container" class="relative inline-block overflow-hidden" v-if="!isMobile" @mousemove="handleMouseMove" @mouseleave="hideMagnifier">
        <!-- Imagen en escala de grises de fondo -->
        <img loading="lazy" :src="imageSrc" class="block w-full h-auto grayscale transition-all duration-100" alt="Logo" />

        <!-- Efecto de revelado con forma orgánica -->
        <div class="absolute inset-0 pointer-events-none mix-blend-normal" v-show="show" :style="{
            maskImage: `radial-gradient(circle ${magnifierSize / 2}px at ${mouseX}px ${mouseY}px, white 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${magnifierSize / 2}px at ${mouseX}px ${mouseY}px, white 0%, transparent 100%)`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
        }">
            <img loading="lazy" :src="imageSrc" class="w-full h-auto" :style="{
                filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.3))',
                clipPath: cloudPath,
                WebkitClipPath: cloudPath
            }" />
        </div>
    </div>
    <div v-else>
        <!-- Mostrar la imagen en color directamente en dispositivos móviles -->
        <img loading="lazy" :src="imageSrc" class="block w-full h-auto" alt="Logo" />
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';

    const imageSrc = '/images/logos/logo.png';

    const show = ref(false);
    const mouseX = ref(0);
    const mouseY = ref(0);
    const magnifierSize = ref(130); // Tamaño un poco más grande para mejor efecto
    const container = ref(null);
    const isMobile = ref(false);

    // Detectar si es un dispositivo móvil
    onMounted(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        isMobile.value = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    });

    // Generador de forma orgánica irregular
    const cloudPath = computed(() => {
        const centerX = mouseX.value;
        const centerY = mouseY.value;
        const radius = magnifierSize.value / 2;

        // Puntos de deformación aleatorios pero consistentes
        const points = [];
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const variation = 0.8 + Math.random() * 0.4; // Variación orgánica
            points.push([
                centerX + Math.cos(angle) * radius * variation,
                centerY + Math.sin(angle) * radius * variation
            ]);
        }

        // Crear path SVG para clip-path
        return `path('M ${points.map(p => `${p[0]},${p[1]}`).join(' ')} Z')`;
    });

    function handleMouseMove(e) {
        if (!container.value) return;

        const rect = container.value.getBoundingClientRect();
        mouseX.value = e.clientX - rect.left;
        mouseY.value = e.clientY - rect.top;

        if (!show.value) show.value = true;
    }

    function hideMagnifier() {
        show.value = false;
    }
</script>

<style scoped>
    .container {
        position: relative;
        display: inline-block;
    }

    img {
        display: block;
        user-select: none;
        pointer-events: none;
        -webkit-user-drag: none;
    }

    /* Transición suave para el efecto */
    div {
        transition: opacity 0.15s ease;
        cursor: pointer;
    }
</style>