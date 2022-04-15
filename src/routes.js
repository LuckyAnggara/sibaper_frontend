// IMPORT HALAMAN
import OutputRequest from './views/component/OutputRequest.vue'
import Permintaan from './views/Permintaan.vue'
import Pembelian from './views/Pembelian.vue'
import Table from './views/component/Table.vue'
import Login from './views/Login.vue'
import Persediaan from './views/Persediaan.vue'
import NotFound from './views/NotFound.vue'
import History from './views/History.vue'
import { getUserData, isUserLoggedIn } from './auth'

// SETTING ROUTER

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: Table,
    meta: {
      title: 'Informasi Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/permintaan',
    name: 'permintaan',
    component: Permintaan,
    meta: {
      title: 'Form Permintaan Barang Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/pembelian',
    name: 'pembelian',
    component: Pembelian,
    meta: {
      title: 'Pembelian Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/persediaan',
    name: 'persediaan',
    component: Persediaan,
    meta: {
      title: 'Data Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/history',
    name: 'history',
    component: History,
    meta: {
      title: 'History',
      layout: 'layout-normal',
    },
  },
  {
    path: '/ticket=:no_ticket',
    name: 'output-ticket',
    component: OutputRequest,
    meta: {
      title: 'Bukti',
      layout: 'layout-normal',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login',
      layout: 'layout-full',
    },
  },
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/:path(.*)',
    name: 'not-found',
    component: NotFound,
    meta: {
      layout: 'layout-full',
    },
  },
]

// NAVIGATION
const nonUser = [
  { name: 'Home', href: 'home' },
  { name: 'Permintaan', href: 'permintaan' },
]

const user = [
  { name: 'Home', href: 'home' },
  { name: 'Permintaan', href: 'permintaan' },
  { name: 'History', href: 'history' },
]

const admin = [
  { name: 'Home', href: 'home' },
  { name: 'Persediaan', href: 'persediaan' },
  { name: 'Pembelian', href: 'pembelian' },
]

export const getNavigation = () => {
  const isLoggedIn = isUserLoggedIn()
  const userData = getUserData()
  if (isLoggedIn) {
    if (userData.role == 'USER') {
      return user
    } else if (userData.role == 'ADMIN') {
      return admin
    }
  } else {
    return nonUser
  }
  // return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}

// SETTING GUARD
