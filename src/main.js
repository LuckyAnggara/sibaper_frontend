import { createApp } from 'vue'

import App from './App.vue'
import './index.css'

import moment from 'moment'

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

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  // if (!isLoggedIn) return next({ name: 'login' })

  if (to.name !== 'home' && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  } else next()
})

app.config.globalProperties.$axios = axiosIns
app.config.globalProperties.$moment = moment
app.use(router)
app.mount('#app')

// createApp(App).mount('#app')
