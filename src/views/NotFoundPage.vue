<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-200 text-center p-6">
        <div class="max-w-lg mx-auto bg-gray-50 shadow-md rounded-lg p-10 border border-gray-300">
            <h1 class="text-7xl font-bold text-gray-700 mb-4 flex items-center justify-center animated-container">
                <span class="animated-text">{{ animatedText }}</span>
                <span class="cursor"></span>
            </h1>
            <h2 class="text-xl font-medium text-gray-800 mb-6">Página no encontrada</h2>
            <p class="text-gray-600 mb-8">
                No pudimos encontrar la página que buscas. Por favor, verifica la URL o regresa al inicio.
            </p>
            <button 
                @click="$router.push('/')" 
                class="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
                <span class="flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    <span>Volver al inicio</span>
                </span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFoundPage',
    data() {
        return {
            animatedText: '',
            fullText: '404',
        };
    },
    mounted() {
        this.animateText();
    },
    methods: {
        async animateText() {
            while (true) {
                for (let i = 0; i <= this.fullText.length; i++) {
                    this.animatedText = this.fullText.slice(0, i);
                    await this.sleep(500); 
                }
                await this.sleep(700); 
                for (let i = this.fullText.length; i >= 0; i--) {
                    this.animatedText = this.fullText.slice(0, i);
                    await this.sleep(400); 
                }
                await this.sleep(700); 
            }
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
    },
};
</script>

<style scoped>
h1 {
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
}

button {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

button:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.cursor {
    display: inline-block;
    width: 2px; 
    height: 1em;
    background-color: black;
    animation: blink 1s steps(2, start) infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

/* Efecto de pulsación al hacer clic */
button:active {
    transform: translateY(0) scale(0.98);
}
</style>