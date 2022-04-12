// IMPORT HALAMAN
import Home from './views/Home.vue'
import OutputRequest from './views/component/OutputRequest.vue'
import Permintaan from './views/Permintaan.vue'
import Table from './views/component/Table.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import History from './views/History.vue'

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

// SETTING GUARD
