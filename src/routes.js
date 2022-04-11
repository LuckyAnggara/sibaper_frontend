// IMPORT HALAMAN
import Home from './views/component/Home.vue'
import Table from './views/component/Table.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'

// SETTING ROUTER

export const routes = [
  { path: '/home', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: '/', component: Home },
  { path: '/:path(.*)', name: 'not-found', component: NotFound },
]

// SETTING GUARD
