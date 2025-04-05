<template>
    <nav>
      <!-- Botón de menú (móvil) -->
      <button @click="toggleMenu" class="md:hidden fixed top-11 right-5 z-50 focus:outline-none">
        <img
          :src="isOpen ? '/images/icons/close.png' : '/images/icons/menubar.png'"
          alt="menu icon"
          class="w-10 h-10 transition-transform duration-300 transform"
          :class="{ 'rotate-90': isOpen }"
        />
      </button>
  
      <!-- Menú móvil desplegable -->
      <transition name="fade">
        <div
          v-show="isOpen"
          class="fixed inset-0 z-40 bg-cover bg-center"
          style="background-image: url('/images/fondo.jpg');"
        >
          <!-- Overlay oscuro -->
          <div class="absolute inset-0 bg-black bg-opacity-80"></div>
  
          <!-- Texto PORTAFOLIO dentro del menú -->
          <div class="absolute top-15 left-5 z-50 text-white text-sm md:text-xs leading-tight font-semibold uppercase text-left">
            <p>PORTAFOLIO DE</p>
            <p>GERARDO BERNAL</p>
            <p>LUNA</p>
          </div>
  
          <!-- Enlaces del menú -->
          <ul
            class="relative h-full flex flex-col items-center justify-center space-y-6 text-white text-sm uppercase z-50"
          >
            <li><a @click="navigate('#about')" :class="{ underline: activeSection === 'about' }" class="uppercase font-semibold">Sobre mí</a></li>
            <li><a @click="navigate('#services')" :class="{ underline: activeSection === 'services' }" class="uppercase font-semibold">Servicios</a></li>
            <li><a @click="navigate('#projects')" :class="{ underline: activeSection === 'projects' }" class="uppercase font-semibold">Proyectos</a></li>
            <li><a @click="navigate('#contact')" :class="{ underline: activeSection === 'contact' }" class="uppercase font-semibold">Contacto</a></li>
          </ul>
        </div>
      </transition>
  
      <!-- Menú escritorio -->
      <div class="hidden md:flex flex-col items-end fixed bottom-15 right-15 text-xs space-y-2 text-black z-50">
        <a href="#about" :class="{ underline: activeSection === 'about' }" class="uppercase font-semibold">Sobre mí</a>
        <a href="#services" :class="{ underline: activeSection === 'services' }" class="uppercase font-semibold">Servicios</a>
        <a href="#projects" :class="{ underline: activeSection === 'projects' }" class="uppercase font-semibold">Proyectos</a>
        <a href="#contact" :class="{ underline: activeSection === 'contact' }" class="uppercase font-semibold">Contacto</a>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    props: ['activeSection'],
    data() {
      return {
        isOpen: false,
      }
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen
        this.togglePortfolioTitle()
      },
      closeMenu() {
        this.isOpen = false
        this.togglePortfolioTitle()
      },
      navigate(target) {
        this.closeMenu()
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
      },
      togglePortfolioTitle() {
        const title = document.getElementById('main-title')
        if (title) {
          title.style.display = this.isOpen ? 'none' : 'block'
        }
      }
    },
  }
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  a.underline {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
  </style>
  