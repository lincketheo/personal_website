import "./styles.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMathjax from "vue-mathjax-next"

const app = createApp(App)

app.use(router)
app.use(VueMathjax)

app.mount('#app')
