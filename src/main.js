import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { 
    faBolt,               // Electricidad
    faFaucet,             // Plomería
    faBorderStyle,        // Tablaroca
    faPaintRoller,        // Pasta y pintura
    faHammer,             // Albañilería
    faCloudRain,          // Impermeabilizaciones
    faSnowflake,          // Aire acondicionado
    faWindowMaximize,     // Ventanería
    faBorderAll,          // Pisos cerámicos
    faMobileAlt,          // Celular
    faPhone,              // Teléfono
    faMapMarkerAlt,       // Ubicación
    faCalendar,           // Fecha
    faHome,               // Casa
    faArrowLeft,          // Flecha izquierda
    faEnvelope,           // Correo electrónico
} from '@fortawesome/free-solid-svg-icons';
  
// Añade los iconos a la librería
  library.add(
    faBolt,
    faFaucet,
    faBorderStyle,
    faPaintRoller,
    faHammer,
    faCloudRain,
    faSnowflake,
    faWindowMaximize,
    faBorderAll,
    faMobileAlt,
    faPhone,
    faMapMarkerAlt,
    faCalendar,
    faHome,
    faArrowLeft,
    faEnvelope
);

const app = createApp(App);
app.config.performance = true // Habilita métricas de rendimiento

// Registra el componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.mount('#app');