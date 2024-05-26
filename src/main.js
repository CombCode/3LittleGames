import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//tailwind
import './index.css'
//p5
import p5vue from "p5vue"

createApp(App).use(router).use(p5vue).mount('#app')
