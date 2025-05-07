<template>
    <div class="relative text-white overflow-x-hidden scroll-smooth">
        <!-- Fondo fijo con overlay oscuro -->
        <div class="fixed inset-0 bg-cover bg-center z-0 h-lvh" style="background-image: url('/images/projects/Condominio/Edificio frente.webp');">
            <div class="absolute inset-0 bg-black opacity-85 h-lvh"></div>
        </div>

        <!-- Botón "Volver al inicio" -->
        <div @click="$router.push('/')" class="relative md:fixed top-20 left-5 z-50 text-white text-xs leading-tight font-normal uppercase text-left cursor-pointer group">
            <font-awesome-icon icon="arrow-left" size="xl" class="w-8 h-8 text-white mr-2 transition-all duration-300 group-hover:-translate-x-1" />
            <span class="transition-all duration-300 group-hover:underline">Volver al inicio</span>
        </div>

        <div class="relative z-10 pb-20">
            <section class="min-h-screen flex flex-col justify-center px-10 md:px-32 lg:px-48 xl:px-60 pt-20 mt-10">
                <!-- Título principal -->
                <p class="text-left text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight text-white mb-12 tracking-wide">
                    MUEBLES BOSQUE DE RADIATAS 26
                </p>

                <!-- Información del proyecto -->
                <div class="w-full max-w-4xl text-left grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="flex flex-col space-y-2">
                        <div class="flex items-center space-x-2">
                            <h2 class="text-sm md:text-base text-white opacity-80">FECHA</h2>
                            <font-awesome-icon icon="calendar" class="text-white text-base opacity-80" />
                        </div>
                        <p class="text-xs md:text-sm text-white">
                            15 DE SEPTIEMBRE DEL 2018 - 03 MARZO DEL 2020
                        </p>
                    </div>

                    <div class="flex flex-col space-y-2">
                        <div class="flex items-center space-x-2">
                            <h2 class="text-sm md:text-base text-white opacity-80">LUGAR</h2>
                            <font-awesome-icon icon="map-marker-alt" class="text-white text-base opacity-80" />
                        </div>
                        <p class="text-xs md:text-sm text-white">
                            BOSQUES DE LAS LOMAS, CUAJIMALPA DE MORELOS, 05120 CIUDAD DE MÉXICO, CDMX.
                        </p>
                    </div>
                </div>

                <!-- Descripción -->
                <div class="w-full max-w-4xl text-left mt-8">
                    <ul class="text-sm md:text-base text-white list-disc pl-5">
                        <li>LOTE DE MUEBLES DE CLOSET Y COCINA EN CONDOMINIO BOSQUE DE RADIATAS 26.</li>
                    </ul>
                </div>

                <!-- Carrusel -->
                <div class="relative w-full h-96 md:h-[500px] mt-16 overflow-hidden group">
                    <div class="absolute inset-0 flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                        <div v-for="(image, index) in galleryImages" :key="index" class="w-full h-full flex-shrink-0">
                            <img loading="lazy" :src="image" class="w-full h-full object-contain" alt="Imagen del proyecto">
                        </div>
                    </div>

                    <!-- Flechas -->
                    <button @click="prev" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button @click="next" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <!-- Indicadores -->
                    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div v-for="(_, index) in galleryImages" :key="index" @click="goTo(index)"
                            class="w-3 h-3 rounded-full cursor-pointer transition-all" :class="{
                                'bg-white w-6': currentIndex === index,
                                'bg-white bg-opacity-50': currentIndex !== index
                            }">
                        </div>
                    </div>
                </div>

                <!-- Miniaturas -->
                <div class="flex overflow-x-auto py-4 space-x-3 mt-4 px-4 custom-scrollbar">
                    <div v-for="(image, index) in galleryImages" :key="index" @click="goTo(index)" class="flex-shrink-0 w-24 h-24 cursor-pointer border-2 transition-all relative overflow-hidden rounded-lg"
                        :class="{
                            'border-white scale-105': currentIndex === index,
                            'border-transparent opacity-80 hover:opacity-100': currentIndex !== index
                        }">
                        <img loading="lazy" :src="image" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" alt="Miniatura">
                        <div v-if="currentIndex === index" class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div class="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
            galleryImages: [
                '/images/projects/Muebles/Muebles closet.webp',
                '/images/projects/Muebles/Muebles cocina.webp',
                '/images/projects/Muebles/Repisas.webp',
            ]
        }
    },
    methods: {
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length
        },
        goTo(index) {
            this.currentIndex = index
        }
    }
}
</script>

<style scoped>
    .custom-scrollbar::-webkit-scrollbar {
        height: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.6);
    }

    .group:hover .group-hover\:-translate-x-1 {
        transform: translateX(-4px);
    }
</style>