import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
    apiKey: "AIzaSyBbpbr2SEIbE3ekxLMkcd21SlUKKGimKw4",
    authDomain: "smart-work-schedule.firebaseapp.com",
    projectId: "smart-work-schedule",
    storageBucket: "smart-work-schedule.appspot.com",
    messagingSenderId: "299208578489",
    appId: "1:299208578489:web:aa8dc520b90f2b85c2d268",
    measurementId: "G-8GMJ5GH89X"
};


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
