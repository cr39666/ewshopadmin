import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./router";
import './styles/tailwind.css'
import './styles/index.less'

const app=createApp(App)
app.use(router)
app.mount('#app')
