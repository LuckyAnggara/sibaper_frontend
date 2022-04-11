import { createApp } from 'vue'

import App from './App.vue'
import './index.css'
import Vuex from 'vuex'

import moment from 'moment'
import vfmPlugin from 'vue-final-modal'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

import { createRouter, createWebHistory } from 'vue-router'
import {
  isUserLoggedIn,
  getHomeRouteForLoggedInUser,
  getUserData,
} from './auth'
import { routes } from './routes.js'

// axios
import axios from 'axios'
// moment

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://127.0.0.1:8000/api',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const app = createApp(App)

// SETTING ROUTER
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (to.name == 'login' && isLoggedIn) {
    next({ name: 'home' })
  } else next()
})

// SETTING MODULES STATE MANAGEMENT VUEX
import user from './store/user'
const store = new Vuex.Store({
  modules: {
    'app-user': user,
  },
})

app.config.globalProperties.$axios = axiosIns
app.config.globalProperties.$moment = moment
// app.config.globalProperties.$toast = VueToast
app.use(router)
app.use(VueToast)
app.use(vfmPlugin)
app.use(store)
app.mount('#app')

// createApp(App).mount('#app')
