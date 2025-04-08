<template>
    <nav>
        <!-- Botón de menú (móvil) -->
        <button @click="toggleMenu" class="md:hidden fixed top-11 right-5 z-50 focus:outline-none">
            <img alt="menu icon" class="w-10 h-10 transition-transform duration-300 transform"
            :src="isOpen ? '/images/icons/close.png' : '/images/icons/menubar.png'"
            :class="{ 'rotate-90': isOpen }"/>
        </button>
  
        <!-- Menú móvil desplegable -->
        <transition name="fade">
            <div class="fixed inset-0 z-40 bg-cover bg-center" style="background-image: url('/images/fondo.jpg');" v-show="isOpen">
                <!-- Overlay oscuro -->
                <div class="absolute inset-0 bg-black bg-opacity-80"></div>
    
                <!-- Texto dentro del menú -->
                <div class="absolute top-15 left-5 z-50 text-white text-xs md:text-xs leading-tight font-normal uppercase text-left">
                    <p class="tracking-wide">PORTAFOLIO DE</p>
                    <p class="tracking-wide">GERARDO BERNAL</p>
                    <p class="tracking-wide">LUNA</p>
                </div>
    
                <!-- Enlaces del menú -->
                <ul id="menu-mobile" class="relative h-full flex flex-col items-center justify-center space-y-6 text-white text-5xl uppercase z-50">
                    <li><a @click="navigate('#about')" :class="{ underline: activeSection === 'about' }" class="uppercase font-normal">Sobre mí</a></li>
                    <li><a @click="navigate('#services')" :class="{ underline: activeSection === 'services' }" class="uppercase font-normal">Servicios</a></li>
                    <li><a @click="navigate('#projects')" :class="{ underline: activeSection === 'projects' }" class="uppercase font-normal">Proyectos</a></li>
                    <li><a @click="navigate('#contact')" :class="{ underline: activeSection === 'contact' }" class="uppercase font-normal">Contacto</a></li>
                </ul>
            </div>
        </transition>
  
        <!-- Menú escritorio -->
        <div class="hidden md:flex flex-col items-end fixed bottom-15 right-5 text-xs space-y-2 text-black z-50" id="menu-desktop">
            <a href="#about" :class="{ underline: activeSection === 'about' }" class="uppercase font-normal">Sobre mí</a>
            <a href="#services" :class="{ underline: activeSection === 'services' }" class="uppercase font-normal">Servicios</a>
            <a href="#projects" :class="{ underline: activeSection === 'projects' }" class="uppercase font-normal">Proyectos</a>
            <a href="#contact" :class="{ underline: activeSection === 'contact' }" class="uppercase font-normal">Contacto</a>
        </div>
    </nav>
</template>
  
<script>
    import $ from 'jquery'

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
                const title = $('#main-title')
                if (title) {
                    title.css('opacity', this.isOpen ? '0' : '1')
                }   

                const arrow = $('#arrow')
                if (arrow) {
                    arrow.css('opacity', this.isOpen ? '0' : '1')
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

    #menu-desktop a.underline {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }

    #menu-mobile a.underline {
        text-decoration: underline;
        text-decoration-thickness: 5px;
        text-underline-offset: 5px;
    }
</style>
  