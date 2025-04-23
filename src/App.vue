<template>
    <router-view v-slot="{ Component, route }">
        <transition
            :name="route.meta.transition || 'fade'"
            mode="out-in"
            @before-enter="beforeEnter"
            @after-enter="afterEnter"
        >
            <component :is="Component" />
        </transition>
    </router-view>
</template>
  
<script>
    export default {
        name: 'App',
        setup() {
            const beforeEnter = () => {
                document.body.style.overflow = 'hidden'
            }
        
            const afterEnter = () => {
                document.body.style.overflow = ''
            }
        
            return { beforeEnter, afterEnter }
        }
    }
</script>
  
<style>
    /* Transiciones mejoradas */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }
  
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
  
    .slide-up-enter-active {
        transition: all 0.7s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
    
    .slide-up-leave-active {
        transition: all 0.5s cubic-bezier(0.5, 0, 0.5, 1);
    }
    
    .slide-up-enter-from {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .slide-up-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
  
    /* Bloquea el scroll durante la transición */
    body {
        overflow-x: hidden;
    }
</style>