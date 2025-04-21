import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importa los iconos que necesites (ej: sólidos)
import { faArrowLeft, faMobileAlt, faPhone, faMapMarkerAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';

// Añade los iconos a la librería
library.add(faArrowLeft, faMobileAlt, faPhone, faMapMarkerAlt, faCalendar);

const app = createApp(App);

// Registra el componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.mount('#app');