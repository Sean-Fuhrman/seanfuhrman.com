/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import MyIntroduction from '@/components/MyIntroduction.vue'
import AboutMe from '@/components/AboutMe.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import {createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path:'/', component: MyIntroduction },
        { path:'/about', component: AboutMe }
    ]
});

const app = createApp(App)

app.use(router)
registerPlugins(app)

app.mount('#app')
