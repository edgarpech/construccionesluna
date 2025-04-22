<template>
    <div>
        <!-- Pantalla de carga -->
        <div v-if="isLoading" class="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
            <div id="main-title" class="fixed top-15 left-5 z-50 text-black text-xs md:text-xs leading-tight font-normal uppercase text-left">
                <p class="tracking-wide">PORTAFOLIO DE</p>
                <p class="tracking-wide">GERARDO BERNAL</p>
                <p class="tracking-wide">LUNA</p>
            </div>

            <div class="relative flex items-center justify-center">
                <img src="/images/logos/logo.png" alt="Loading..." class="w-24 animate-pulse" />
                <svg class="absolute w-36 h-36 transform rotate-[-90deg]" viewBox="0 0 100 100">
                    <circle class="text-gray-300" stroke="currentColor" stroke-width="4" fill="transparent" r="45" cx="50" cy="50" />
                    <circle class="text-[#3B3B3B]" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" stroke="currentColor" stroke-width="4" fill="transparent" r="45" cx="50" cy="50" stroke-linecap="round" />
                </svg>
            </div>
        </div>

        <!-- Contenido principal -->
        <div v-else :class="{ 'fade-in': !isLoading }" class="relative text-black overflow-x-hidden scroll-smooth">
            <!-- Fondo fijo -->
            <div class="fixed inset-0 bg-cover bg-center brightness-85 grayscale z-0" style="background-image: url('/images/fondo.jpg');"></div>

            <!-- Elementos fijos -->
            <div id="main-title" class="relative md:fixed top-15 left-5 z-50 text-black text-xs md:text-xs leading-tight font-normal uppercase text-left">
                <p class="tracking-wide">PORTAFOLIO DE</p>
                <p class="tracking-wide">GERARDO BERNAL</p>
                <p class="tracking-wide">LUNA</p>
            </div>

            <!-- Flecha de scroll -->
            <div id="arrow" v-if="showArrow" @click="scrollToNextSection" class="fixed bottom-4 left-4 z-50 animate-bounce cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 md:h-18 md:w-18 text-[#3B3B3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v14m7-6l-7 7-7-7" />
                </svg>
            </div>

            <Navigation :activeSection="activeSection" />

            <!-- Contenido scrollable -->
            <div class="relative z-10 space-y-1">
                <section id="home" ref="home" class="min-h-screen flex flex-col items-center justify-center text-center space-y-18 px-6 md:px-28 lg:px-28 xl:px-36">
                    <p class="text-center text-lg md:text-2xl lg:text-2xl xl:text-2xl font-medium text-[#3B3B3B]">PROYECTO, DISEÑO Y <br> CONSTRUCCIÓN</p>
                    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center text-[#3B3B3B] tracking-wide">
                        MANTENIMIENTO Y <br>ACABADOS LUNA
                    </h1>
                    <div class="flex flex-col items-end w-full px-6 md:px-16 lg:px-30 xl:px-30 text-[#3B3B3B]">
                        <span class="text-right text-lg tracking-wide">INGENIERO</span>
                        <span class="text-right text-lg tracking-wide pr-12">ELECTRICISTA</span>
                    </div>
                </section>

                <!-- Sección Sobre mí -->
                <section id="about" ref="about" class="min-h-screen flex flex-col px-6 md:px-28 lg:px-28 xl:px-36 mb-28 md:mb-0">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-1 px-6 md:px-16 lg:px-30 xl:px-30">
                        <!-- Título en la parte superior izquierda -->
                        <div class="col-span-1 md:col-span-1 text-left">
                            <p class="text-xs md:text-xs font-normal mb-4">SOBRE MÍ</p>
                        </div>
                        <!-- Información en la parte superior derecha -->
                        <div class="col-span-1 md:col-span-2 text-right">
                            <p class="text-left text-xs md:text-xs font-normal">
                                Soy Gerardo Bernal Luna, ingeniero electricista apasionado por la innovación y con una sólida trayectoria en el sector de la construcción.
                                <br><br>Desde 2008, dirijo Mantenimiento y Acabados Luna, una empresa dedicada al diseño, planificación y ejecución de obras, ofreciendo soluciones eficientes y funcionales para cada cliente.
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-20 px-6 md:px-16 lg:px-30 xl:px-30">
                        <!-- Más información en la parte inferior izquierda -->
                        <div class="col-span-1 md:col-span-2 text-left">
                            <p class="text-xs md:text-xs font-normal">
                                A lo largo de mi carrera, he trabajado en proyectos de diferentes escalas, combinando técnica y creatividad para lograr resultados de alta calidad.
                                <br><br>Mi enfoque está en la innovación, el cumplimiento de normativas y la optimización de recursos, asegurando que cada construcción sea segura, duradera y eficiente.
                            </p>
                        </div>
                        <!-- Logo en la parte inferior derecha -->
                        <div class="col-span-1 md:col-span-1 text-right">
                            <RevealImage />
                        </div>
                    </div>
                    <!-- Más información en la parte inferior -->
                    <div class="grid grid-cols-1 mt-20 px-6 md:px-16 lg:px-30 xl:px-30">
                        <p class="text-xs md:text-xs font-normal text-left">
                            Mi compromiso es brindar un servicio profesional basado en la confianza, la excelencia y la mejora continua.
                        </p>
                    </div>
                </section>

                <!-- Servicios -->
                <section id="services" ref="services" class="min-h-screen flex flex-col px-6 md:px-28 lg:px-28 xl:px-36 xl:mb-28">
                    <div class="grid grid-cols-1 px-6 md:px-16 lg:px-30 xl:px-30">
                        <!-- Título en la parte superior izquierda -->
                        <div class="text-right">
                            <p class="text-xs md:text-xs font-normal mb-4">SERVICIOS</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 items-center mt-10 px-6 md:px-16 lg:px-30 xl:px-30 text-justify">
                        <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#3B3B3B] leading-relaxed">
                            ELECTRICIDAD. PLOMERÍA. TABLAROCA EN MUROS Y PLAFONES. PASTA Y PINTURA. ALBAÑILERÍA Y ACABADOS. IMPERMEABILIZACIONES. AIRE ACONDICIONADO. VENTANERÍA EN ALUMINIO. PISOS CERÁMICOS NACIONALES E IMPORTADOS.
                        </h2>
                    </div>
                </section>

                <!-- Proyectos -->
                <section id="projects" ref="projects" class="min-h-screen flex flex-col px-6 md:px-28 lg:px-28 xl:px-36 xl:mb-28">
                    <div class="grid grid-cols-1 px-6 md:px-16 lg:px-30 xl:px-30">
                        <div class="text-left">
                            <p class="text-xs md:text-xs font-normal mb-10">PROYECTOS / TRABAJOS ELABORADOS</p>
                        </div>
                    </div>

                    <!-- Lista de proyectos alternados -->
                    <div class="space-y-40 px-6 md:px-16 lg:px-30 xl:px-30">
                        <ProjectCard 
                            imageSrc="/images/projects/Alberca/Ampliación alberca.jpeg" 
                            title="ALBERCA HACIENDA DE LAS PALMAS"
                            projectUrl="/projects/alberca"
                            :alternate="true"
                        />
                        
                        <ProjectCard 
                            imageSrc="/images/projects/Condominio/Edificio en construccion 3.jpeg" 
                            title="CONDOMINIO SANTA CLARA"
                            projectUrl="/projects/condominio"
                            :alternate="false"
                        />

                        <ProjectCard 
                            imageSrc="/images/projects/Elevador/Elevador en proceso.jpeg" 
                            title="ELEVADOR DE EDIFICIO COMERCIAL"
                            projectUrl="/projects/elevador"
                            :alternate="true"
                        />
                        
                        <ProjectCard 
                            imageSrc="/images/projects/Fachada/Edificio 1.jpeg" 
                            title="FACHADA BOSQUE DE RADIATAS 26"
                            projectUrl="/projects/fachada"
                            :alternate="false"
                        />

                        <ProjectCard 
                            imageSrc="/images/projects/Muebles/Muebles cocina.jpeg" 
                            title="MUEBLES BOSQUE DE RADIATAS 26"
                            projectUrl="/projects/muebles"
                            :alternate="true"
                        />
                        
                    </div>
                </section>

                <!-- Contacto -->
                <section id="contact" ref="contact" class="min-h-screen flex flex-col px-6 md:px-28 lg:px-28 xl:px-36">
                    <div class="grid grid-cols-1 px-6 md:px-16 lg:px-30 xl:px-30">
                        <!-- Título en la parte superior izquierda -->
                        <div class="text-left">
                            <p class="text-xs md:text-xs font-normal mb-4">CONTÁCTAME</p>
                        </div>
                    </div> 
                    <!-- correo -->
                    <div class="text-right mt-4 px-6 md:px-16 lg:px-30 xl:px-30">
                        <a 
                            href="mailto:Gerardobernalluna@gmail.com" 
                            target="_blank" 
                            class="text-xl md:text-2xl lg:text-4xl xl:text-5xl underline font-medium transition-all duration-300 hover:opacity-70
                                text-black [text-shadow:_0_0_8px_rgba(0,0,0,0.5)]"
                        >
                            Gerardobernalluna@<br>gmail.com
                        </a>
                    </div>
                    <!-- Lista de contacto (icono + texto) en forma de columna (movil, telefono, direccion)-->
                    <div class="mt-20 space-y-6 px-6 md:px-16 lg:px-30 xl:px-30">
                        <div class="flex items-center">
                            <font-awesome-icon icon="mobile-alt" size="xl" class="w-8 h-8 text-black mr-2" />
                            <p class="text-left text-xs sm:text-sm md:text-base font-normal">55 4276 0904</p>
                        </div>
                        <div class="flex items-center">
                            <font-awesome-icon icon="phone" size="xl" class="w-8 h-8 text-black mr-2" />
                            <p class="text-left text-xs sm:text-sm md:text-base font-normal">56 4687 9258</p>
                        </div>
                        <div class="flex items-center">
                            <font-awesome-icon icon="map-marker-alt" size="xl" class="w-8 h-8 text-black mr-2 " />
                            <p class="text-left text-xs sm:text-sm md:text-base font-normal">Calle 25A x 28 y 30 #5, Col. Santa Clara,<br> Dzidzantún, Yucatán.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!-- Footer con el desarrollador (solo visible al final) -->
        <div v-if="showDeveloper" class="fixed bottom-0 left-0 z-50 p-4 text-[10px] text-[#3B3B3B] opacity-80 transition-opacity duration-300">
            Desarrollado por Edgar Pech
        </div>
    </div>
</template>

<script>
    import { onMounted, ref, computed } from 'vue';
    import Navigation from '../components/Navigation.vue';
    import RevealImage from '../components/common/RevealImage.vue';
    import ProjectCard from '../components/common/ProjectCard.vue';

    export default {
        components: {
            Navigation,
            RevealImage,
            ProjectCard
        },
        setup() {
            const isLoading = ref(true)
            const showArrow = ref(true)
            const showDeveloper = ref(false);

            const progress = ref(0)
            const circumference = 2 * Math.PI * 45 // radio 45
            const dashOffset = computed(() => circumference * (1 - progress.value / 100))

            onMounted(() => {
                const interval = setInterval(() => {
                    if (progress.value < 100) {
                        progress.value += 5
                    }
                }, 100) // cada 100ms sube 5%, en 2 segundos llega a 100%

                setTimeout(() => {
                    isLoading.value = false
                    clearInterval(interval)
                }, 2000) // 2 segundos
            })

            const activeSection = ref('home')
            const sections = {
                home: ref(null),
                about: ref(null),
                services: ref(null),
                projects: ref(null),
                contact: ref(null),
            }

            const scrollToNextSection = () => {
                const aboutSection = sections.about.value
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' })
                    showArrow.value = false
                }
            }

            const handleScroll = () => {
                const scrollY = window.scrollY;

                // Controlar flecha
                showArrow.value = scrollY <= 50

                // Controlar sección activa
                const centerScroll = scrollY + window.innerHeight / 2
                for (const [key, section] of Object.entries(sections)) {
                    const el = section.value
                    if (el) {
                        const { offsetTop, offsetHeight } = el
                        if (centerScroll >= offsetTop && centerScroll < offsetTop + offsetHeight) {
                            activeSection.value = key
                            showDeveloper.value = (key === 'contact')
                            break
                        }
                    }
                }
            }

            onMounted(() => {
                window.addEventListener('scroll', handleScroll)
            })

            return { ...sections, isLoading, progress, circumference, dashOffset, showArrow, scrollToNextSection, activeSection, showDeveloper }
        }
    }
</script>

<style scoped>
    circle {
        transition: stroke-dashoffset 0.3s ease;
    }

    .fade-in {
        animation: fadeInContent 1s ease-in-out;
    }

    .fade-out {
        animation: fadeOut 0.5s ease-out forwards;
    }

    .animate-spin {
        animation: spin 2s linear infinite;
    }

    .animate-pulse {
        animation: pulse 2s infinite;
    }

    @keyframes fadeInContent {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }

        50% {
            opacity: 0.5;
        }
    }
</style>
