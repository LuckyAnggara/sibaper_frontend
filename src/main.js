import { createApp } from 'vue'

import App from './App.vue'
import './index.css'
import Vuex from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'flowbite'
import moment from 'moment'
import vfmPlugin from 'vue-final-modal'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { $vfm } from 'vue-final-modal'
import { createRouter, createWebHistory } from 'vue-router'
import { getUserData, isUserLoggedIn } from './auth'
import { routes, getNavigation } from './routes.js'

// axios
import axios from 'axios'
// moment

import { baseUrl } from './axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: baseUrl,
  // baseURL: 'http://127.0.0.1:8000/api',
  // baseURL: 'https://siapbaper.bbmakmur.com/api',

  // baseURL: 'http://192.168.1.24:8000/api',

  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const app = createApp(App)

// SETTING ROUTER
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeResolve(async (to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  const userData = getUserData()
  store.commit('app-menu/SET_MENU', getNavigation())

  if (to.name == 'login' && isLoggedIn) {
    next({ name: 'home' })
  } else if (to.name == 'permintaan' && !isLoggedIn) {
    next({ name: 'home' })
    $vfm.show('loginModal')
  } else if (to.name == 'permintaan' && userData.role == 'ADMIN') {
    next({ name: 'home' })
  } else {
    next()
  }
})

// router.beforeEach((to, _, next) => {
//   const isLoggedIn = isUserLoggedIn()

//   if (to.name == 'login' && isLoggedIn) {
//     next({ name: 'home' })
//   }
//   else if (to.name == 'permintaan' && !isLoggedIn) {
//     next({ name: 'home' })
//     $vfm.show('loginModal')
//   }
//   else {
//     next()
//   }
// })

// SETTING MODULES STATE MANAGEMENT VUEX
import user from './store/user'
import request from './store/request'
import purchase from './store/purchase'
import product from './store/product'
import menu from './store/menu'
import mutation from './store/mutation'
const store = new Vuex.Store({
  modules: {
    'app-user': user,
    'app-request': request,
    'app-purchase': purchase,
    'app-menu': menu,
    'app-mutation': mutation,
    'app-product': product,
  },
})

app.config.globalProperties.$axios = axiosIns
app.config.globalProperties.$moment = moment
// app.config.globalProperties.$toast = VueToast
app.use(router)
app.use(VueSweetalert2)
app.use(VueToast)

app.use(
  vfmPlugin({
    key: '$vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer',
  })
)
app.use(store)
app.mount('#app')

// createApp(App).mount('#app')
