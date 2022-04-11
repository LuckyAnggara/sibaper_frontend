// IMPORT HALAMAN
import Home from './views/Home.vue'
import Table from './views/component/Table.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'

// SETTING ROUTER

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Informasi Persediaan',
      layout: 'full',
    },
  },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    name: '/',
    component: Home,
    meta: {
      title: 'Informasi Persediaan',
      layout: 'full',
    },
  },
  { path: '/:path(.*)', name: 'not-found', component: NotFound },
]

// SETTING GUARD
