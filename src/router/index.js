import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AlbercaPage from '../views/projects/AlbercaPage.vue'
import CondominioPage from '../views/projects/CondominioPage.vue'
import ElevadorPage from '../views/projects/ElevadorPage.vue'
import FachadaPage from '../views/projects/FachadaPage.vue'
import MueblesPage from '../views/projects/MueblesPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { transition: 'fade' }
  },
  {
    path: '/proyectos/alberca',
    name: 'alberca',
    component: AlbercaPage,
    meta: { transition: 'slide-up' }
  },
  {
    path: '/proyectos/condominio',
    name: 'condominio',
    component: CondominioPage,
    meta: { transition: 'slide-up' }
  },
  {
    path: '/proyectos/elevador',
    name: 'elevador',
    component: ElevadorPage,
    meta: { transition: 'slide-up' }
  },
  {
    path: '/proyectos/fachada',
    name: 'fachada',
    component: FachadaPage,
    meta: { transition: 'slide-up' }
  },
  {
    path: '/proyectos/muebles',
    name: 'muebles',
    component: MueblesPage,
    meta: { transition: 'slide-up' }
  },
  // Ruta para manejar 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // o '/'
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router