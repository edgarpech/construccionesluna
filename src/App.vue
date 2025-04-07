<template>
  <div class="relative text-black overflow-x-hidden scroll-smooth">
    <!-- Fondo fijo -->
    <div class="fixed inset-0 bg-cover bg-center brightness-85 grayscale z-0" style="background-image: url('/images/fondo.jpg');"></div>

    <!-- Elementos fijos -->
    <div id="main-title" class="relative md:fixed top-15 left-5 z-50 text-black text-xs md:text-xs leading-tight font-semibold uppercase text-left">
      <p>PORTAFOLIO DE</p>
      <p>GERARDO BERNAL</p>
      <p>LUNA</p>
    </div>

    <Navigation :activeSection="activeSection" />

    <!-- Contenido scrollable -->
    <div class="relative z-10 space-y-24">
      <!-- Sección principal -->
      <section id="home" ref="home" class="min-h-screen flex flex-col items-center justify-center text-center space-y-20 px-6 md:px-28 lg:px-28 xl:px-36">
        <p class="text-center text-xl md:text-2xl font-medium text-[#3B3B3B]">PROYECTO, DISEÑO Y <br> CONSTRUCCIÓN</p>
        <h1 class="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center text-black">
          MANTENIMIENTO Y <br>ACABADOS LUNA
        </h1>
        <div class="flex flex-col items-end w-full px-6 md:px-16 lg:px-16 xl:px-16 text-[#3B3B3B]">
          <span class="text-right">INGENIERO</span>
          <span class="text-right pr-12">ELECTRICISTA</span>
        </div>
      </section>

      <!-- Sección Sobre mí -->
      <section id="about" ref="about" class="min-h-screen px-4 md:px-16 text-black">
        <h2 class="text-3xl font-bold mb-4">Sobre mí</h2>
        <p>...</p>
      </section>

      <!-- Servicios -->
      <section id="services" ref="services" class="min-h-screen px-4 md:px-16 text-black">
        <h2 class="text-3xl font-bold mb-4">Servicios</h2>
        <p>...</p>
      </section>

      <!-- Proyectos -->
      <section id="projects" ref="projects" class="min-h-screen px-4 md:px-16 text-black">
        <h2 class="text-3xl font-bold mb-4">Proyectos</h2>
        <p>...</p>
      </section>

      <!-- Contacto -->
      <section id="contact" ref="contact" class="min-h-screen px-4 md:px-16 text-black">
        <h2 class="text-3xl font-bold mb-4">Contacto</h2>
        <p>...</p>
      </section>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Navigation from './components/Navigation.vue'

export default {
  components: {
    Navigation,
  },
  setup() {
    const activeSection = ref('home')
    const sections = {
      home: ref(null),
      about: ref(null),
      services: ref(null),
      projects: ref(null),
      contact: ref(null),
    }

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2

      for (const [key, section] of Object.entries(sections)) {
        const el = section.value
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            activeSection.value = key
            break
          }
        }
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { ...sections, activeSection }
  }
}
</script>
