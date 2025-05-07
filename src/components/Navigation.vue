<template>
    <nav>
        <!-- Botón de menú (móvil) -->
        <button @click="toggleMenu" class="md:hidden fixed top-11 right-5 z-50 focus:outline-none">
            <img alt="menu icon" class="w-10 h-10 transition-transform duration-300 transform"
            :src="isOpen ? '/images/icons/close.webp' : '/images/icons/menubar.webp'"
            :class="{ 'rotate-90': isOpen }"/>
        </button>
  
        <!-- Menú móvil desplegable -->
        <transition name="fade">
            <div class="fixed inset-0 z-40 bg-cover bg-center" style="background-image: url('/images/fondo.webp');" v-show="isOpen">
                <!-- Overlay oscuro -->
                <div class="absolute inset-0 bg-black bg-opacity-80"></div>
    
                <!-- Texto dentro del menú -->
                <div class="absolute top-15 left-5 z-50 text-white text-xs md:text-xs leading-tight font-normal uppercase text-left">
                    <p class="tracking-wide">PORTAFOLIO DE</p>
                    <p class="tracking-wide">GERARDO BERNAL</p>
                    <p class="tracking-wide">LUNA</p>
                </div>
    
                <!-- Enlaces del menú -->
                <ul id="menu-mobile" class="relative h-full flex flex-col items-center justify-center space-y-6 text-white text-4xl md:text-5xl uppercase z-50">
                    <li><a href="#about" @click.prevent="navigate('#about', 'about')" :class="{ underline: activeSection === 'about' }" class="uppercase font-normal">Sobre mí</a></li>
                    <li><a href="#services" @click.prevent="navigate('#services', 'services')" :class="{ underline: activeSection === 'services' }" class="uppercase font-normal">Servicios</a></li>
                    <li><a href="#projects" @click.prevent="navigate('#projects', 'projects')" :class="{ underline: activeSection === 'projects' }" class="uppercase font-normal">Proyectos</a></li>
                    <li><a href="#contact" @click.prevent="navigate('#contact', 'contact')" :class="{ underline: activeSection === 'contact' }" class="uppercase font-normal">Contacto</a></li>
                </ul>
            </div>
        </transition>
  
        <!-- Menú escritorio -->
        <div class="hidden md:flex flex-col items-end fixed bottom-15 right-5 text-xs space-y-4 text-black z-50" id="menu-desktop">
            <a href="#about" @click.prevent="navigate('#about', 'about')" id="about-link" class="uppercase font-normal relative inline-block" :class="{ 'active': activeSection === 'about' }">
                <span @mouseover="handleHover('about')" @mouseleave="handleHoverLeave('about')" class="relative z-10">Sobre mí</span>
                <svg id="circle" :viewBox="getViewBox('Sobre mí')" xmlns="http://www.w3.org/2000/svg" :width="getWidth('Sobre mí')" height="35" class="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <path :d="getPath('Sobre mí')" fill="transparent" stroke="black" stroke-width="2"/>
                </svg>
            </a>
            <a href="#services" @click.prevent="navigate('#services', 'services')" id="services-link" class="uppercase font-normal relative inline-block" :class="{ 'active': activeSection === 'services' }">
                <span @mouseover="handleHover('services')" @mouseleave="handleHoverLeave('services')" class="relative z-10">Servicios</span>
                <svg id="circle2" :viewBox="getViewBox('Servicios')" xmlns="http://www.w3.org/2000/svg" :width="getWidth('Servicios')" height="35" class="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <path :d="getPath('Servicios')" fill="transparent" stroke="black" stroke-width="2"/>
                </svg>
            </a>
            <a href="#projects" @click.prevent="navigate('#projects', 'projects')" id="projects-link" class="uppercase font-normal relative inline-block" :class="{ 'active': activeSection === 'projects' }">
                <span @mouseover="handleHover('projects')" @mouseleave="handleHoverLeave('projects')" class="relative z-10">Proyectos</span>
                <svg id="circle3" :viewBox="getViewBox('Proyectos')" xmlns="http://www.w3.org/2000/svg" :width="getWidth('Proyectos')" height="35" class="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <path :d="getPath('Proyectos')" fill="transparent" stroke="black" stroke-width="2"/>
                </svg>
            </a>
            <a href="#contact" @click.prevent="navigate('#contact', 'contact')" id="contact-link" class="uppercase font-normal relative inline-block" :class="{ 'active': activeSection === 'contact' }">
                <span @mouseover="handleHover('contact')" @mouseleave="handleHoverLeave('contact')" class="relative z-10">Contacto</span>
                <svg id="circle4" :viewBox="getViewBox('Contacto')" xmlns="http://www.w3.org/2000/svg" :width="getWidth('Contacto')" height="35" class="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <path :d="getPath('Contacto')" fill="transparent" stroke="black" stroke-width="2"/>
                </svg>
            </a>
        </div>
    </nav>
</template>
  
<script>
import Vivus from 'vivus';

export default {
    props: ['activeSection'],
    data() {
        return {
            isOpen: false,
            vivusInstances: {},
            hoveredSection: null,
            hoverAnimatedSections: new Set()
        }
    },
    watch: {
        activeSection(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.updateActiveSection(newVal, oldVal);
            }
        }
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen
            this.togglePortfolioTitle()

            // Bloquear/desbloquear scroll
            if (this.isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },
        closeMenu() {
            this.isOpen = false
            this.togglePortfolioTitle()
            document.body.style.overflow = ''; // Asegurar que se desbloquee al cerrar
        },
        navigate(target, section) {
            this.closeMenu();
            
            // Solo animar si no estamos ya en esta sección y no fue animada por hover
            if (this.activeSection !== section && !this.hoverAnimatedSections.has(section)) {
                this.animateSection(section);
            }
            
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        },
        togglePortfolioTitle() {
            const title = document.getElementById('main-title');
            if (title) {
                title.style.opacity = this.isOpen ? '0' : '1';
            }

            const arrow = document.getElementById('arrow');
            if (arrow) {
                arrow.style.opacity = this.isOpen ? '0' : '1';
            }
        },
        getPath(id) {
            const paths = {
                'Sobre mí': 'M5,28 C20,0 100,8 115,35 C100,60 15,65 5,32 Z',
                'Servicios': 'M8,30 C15,5 105,0 110,30 C95,65 20,60 10,35 Z',
                'Proyectos': 'M6,27 C18,2 102,10 114,33 C104,62 12,63 8,30 Z',
                'Contacto': 'M9,33 C16,7 108,5 115,32 C98,63 18,59 7,36 Z',
            }
            return paths[id] || ''
        },
        getViewBox(id) {
            const viewBoxes = {
                'Sobre mí': '0 0 120 60',
                'Servicios': '0 0 120 60',
                'Proyectos': '0 0 120 60',
                'Contacto': '0 0 120 60',
            }
            return viewBoxes[id] || ''
        },
        getWidth(id) {
            const widths = {
                'Sobre mí': 60,
                'Servicios': 70,
                'Proyectos': 70,
                'Contacto': 60,
            }
            return widths[id] || 0
        },
        getElementId(section) {
            const mapping = {
                'about': 'circle',
                'services': 'circle2',
                'projects': 'circle3',
                'contact': 'circle4',
            };
            return mapping[section];
        },
        animateSection(section, isHover = false) {
            const elementId = this.getElementId(section);
            const svgElement = document.getElementById(elementId);
            
            if (!svgElement) return;
            
            // Resetear siempre la opacidad antes de animar
            svgElement.style.opacity = '1';
            
            // Limpiar instancia anterior si existe
            if (this.vivusInstances[elementId]) {
                this.vivusInstances[elementId].destroy();
            }
            
            // Crear nueva animación
            this.vivusInstances[elementId] = new Vivus(elementId, {
                type: 'delayed',
                duration: 70,
                start: 'autostart',
                pathTimingFunction: Vivus.EASE_OUT,
            });
            
            // Si es hover, marcarlo como animado
            if (isHover) {
                this.hoverAnimatedSections.add(section);
            }
        },
        resetSection(section) {
            const elementId = this.getElementId(section);
            const svgElement = document.getElementById(elementId);
            
            if (!svgElement) return;
            
            // Si no es la sección activa, resetear
            if (section !== this.activeSection) {
                svgElement.style.opacity = '0';
                
                // Limpiar instancia de animación si existe
                if (this.vivusInstances[elementId]) {
                    this.vivusInstances[elementId].destroy();
                    delete this.vivusInstances[elementId];
                }
            }
        },
        handleHover(section) {
            this.hoveredSection = section;
            
            // Solo animar si no es la sección activa
            if (section !== this.activeSection) {
                this.animateSection(section, true); // Pasamos true para indicar que es hover
            }
        },
        handleHoverLeave(section) {
            this.hoveredSection = null;
            
            // Solo resetear si no es la sección activa
            if (section !== this.activeSection) {
                this.resetSection(section);
                this.hoverAnimatedSections.delete(section);
            }
        },
        updateActiveSection(newSection, oldSection) {
            // Resetear la sección anterior si existe
            if (oldSection) {
                this.resetSection(oldSection);
                this.hoverAnimatedSections.delete(oldSection); // Limpiar el flag de hover
            }
            
            // Siempre animar la nueva sección, independientemente de hover
            if (newSection) {
                this.animateSection(newSection);
            }
        },
        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        // Forzar la animación incluso si fue animada por hover antes
                        this.hoverAnimatedSections.delete(sectionId);
                        this.$emit('section-change', sectionId);
                    }
                });
            }, {
                threshold: 0.3, // Reducir el threshold para mejor detección
                rootMargin: '0px 0px -50% 0px' // Ajustar el área de detección
            });

            // Observar todas las secciones con un margen superior
            ['about', 'services', 'projects', 'contact'].forEach(id => {
                const section = document.getElementById(id);
                if (section) {
                    observer.observe(section);
                    section.style.scrollMarginTop = '130px'; // Ajustar el margen superior para la detección
                }
            });
        }
    },
    mounted() {
        this.setupIntersectionObserver();
        
        // Si hay una sección activa al cargar, animarla
        if (this.activeSection) {
            this.animateSection(this.activeSection);
        }
    },
    beforeDestroy() {
        // Limpiar todas las instancias de Vivus
        Object.values(this.vivusInstances).forEach(instance => {
            instance.destroy();
        });
    }
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

#menu-mobile a.underline {
    text-decoration: underline;
    text-decoration-thickness: 5px;
    text-underline-offset: 5px;
}

#menu-desktop svg {
    opacity: 0;
    transition: opacity 0.3s ease;
}

#menu-desktop a span {
    cursor: pointer;
    z-index: 10;
}

#menu-desktop span:hover svg {
    opacity: 1;
}

#menu-desktop a.active svg {
    opacity: 1 !important;
}
</style>