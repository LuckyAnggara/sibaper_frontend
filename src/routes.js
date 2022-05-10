// IMPORT HALAMAN
import OutputRequest from './views/component/OutputRequest.vue'
import Permintaan from './views/Permintaan.vue'
import Home from './views/Home.vue'
import Pembelian from './views/Pembelian.vue'
import DaftarPembelian from './views/DaftarPembelian.vue'
import DetailPembelian from './views/DetailPembelian.vue'
import DetailPermintaan from './views/DetailPermintaan.vue'
import UserManagement from './views/UserManagement.vue'
import Login from './views/Login.vue'
import Laporan from './views/Laporan.vue'
import Profile from './views/ProfilePage.vue'
import Persediaan from './views/Persediaan.vue'
import NotFound from './views/NotFound.vue'
import History from './views/History.vue'
import DaftarPermintaan from './views/DaftarPermintaan.vue'
import { getUserData, isUserLoggedIn } from './auth'

// SETTING ROUTER

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
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
      title: 'Form Permintaan Persediaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/daftar-permintaan',
    name: 'daftar-permintaan',
    component: DaftarPermintaan,
    meta: {
      title: 'Daftar Permintaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/detail-permintaan',
    name: 'detail-permintaan',
    component: DetailPermintaan,
    meta: {
      title: 'Detail Permintaan',
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
    path: '/daftar-pembelian',
    name: 'daftar-pembelian',
    component: DaftarPembelian,
    meta: {
      title: 'Daftar Pembelian',
      layout: 'layout-normal',
    },
  },
  {
    path: '/detail-pembelian=:id',
    name: 'detail-pembelian',
    component: DetailPembelian,
    meta: {
      title: 'Detail Pembelian',
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
      title: 'Bukti Permintaan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/user-management',
    name: 'user-management',
    component: UserManagement,
    meta: {
      title: 'User Management',
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
    path: '/laporan',
    name: 'laporan',
    component: Laporan,
    meta: {
      title: 'Laporan',
      layout: 'layout-normal',
    },
  },
  {
    path: '/profile-page',
    name: 'profile',
    component: Profile,
    meta: {
      title: 'Profile Page',
      layout: 'layout-normal',
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
  { name: 'Daftar Permintaan', href: 'daftar-permintaan' },
  { name: 'Laporan', href: 'laporan' },
  { name: 'User Management', href: 'user-management' },
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
