import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importa los iconos que necesites (ej: sólidos)
import { faMobileAlt, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Añade los iconos a la librería
library.add(faMobileAlt, faPhone, faMapMarkerAlt);

const app = createApp(App);

// Registra el componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');