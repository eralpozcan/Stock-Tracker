import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'

import VueApexCharts from "vue3-apexcharts";
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import TieredMenu from 'primevue/tieredmenu';
import Toolbar from 'primevue/toolbar';


const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(PrimeVue);
app.use(VueApexCharts);


app.component('Avatar', Avatar);
app.component('AutoComplete', AutoComplete);
app.component('Button', Button);
app.component('SelectButton', SelectButton);
app.component('TieredMenu', TieredMenu);
app.component('Toolbar', Toolbar);

app.mount('#app')
