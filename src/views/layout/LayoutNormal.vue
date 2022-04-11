<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-white" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8" src="../assets/logo.png" alt="Workflow" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <button
                  :class="[
                    currentRouteName == 'home' || '/'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="
                    currentRouteName == 'home' || '/' ? 'page' : undefined
                  "
                >
                  Home
                </button>
                <button
                  @click="permintaan"
                  :class="[
                    currentRouteName == 'permintaan'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="
                    currentRouteName == 'permintaan' ? 'page' : undefined
                  "
                >
                  Permintaan
                </button>
                <button
                  :class="[
                    currentRouteName == 'laporan'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="
                    currentRouteName == 'laporan' ? 'page' : undefined
                  "
                >
                  Laporan
                </button>
              </div>
            </div>
          </div>

          <template v-if="userData">
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <!-- Profile dropdown -->
                <Menu as="div" class="ml-3 relative">
                  <div>
                    <MenuButton
                      class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="user.imageUrl"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem
                        v-for="item in userNavigation"
                        :key="item.name"
                        v-slot="{ active }"
                      >
                        <a
                          @click="item.name === 'Sign out' ? logout() : null"
                          :href="item.href"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >{{ item.name }}</a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link
              :to="{
                name: 'login',
              }"
              class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </router-link>
          </template>

          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="./src/assets/avatar.png"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ userData.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ userData.nip }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ titleRoute }}</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 content-start">
        <!-- Replace with your content -->
        <Table />
        <Login />
        <!-- /End replace -->
      </div>
    </main>
  </div>
  <vue-final-modal
    v-model="showModal"
    classes="flex justify-center items-center"
    content-class="relative p-4 w-full max-w-md h-full md:h-auto"
  >
    <!-- Main modal -->

    <!-- Modal content -->
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div class="flex justify-end p-2">
        <button
          @click="showModal = false"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="authentication-modal"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <form class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Login untuk melanjutkan
        </h3>
        <div>
          <label
            for="nip"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >NIP</label
          >
          <input
            type="number"
            v-model="nip"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Nomor Induk Pegawai"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <button
          v-if="loginLoading"
          disabled
          type="button"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            role="status"
            class="inline mr-3 w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>

        <button
          v-else
          @click="login"
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Belum punya akun?
          <a href="#" class="text-blue-700 hover:underline dark:text-blue-500"
            >Buat akun</a
          >
        </div>
      </form>
    </div>
  </vue-final-modal>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { RouterLink } from 'vue-router'

import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { VueFinalModal } from 'vue-final-modal'
import Table from './component/Table.vue'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: './src/assets/avatar.png',
}
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Permintaan', current: false },
  { name: 'Cek Data', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#', click: '' },
  { name: 'Settings', href: '#', click: '' },
  { name: 'Sign out', href: '#' },
]

export default {
  components: {
    Table,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    RouterLink,
    VueFinalModal,
  },
  data() {
    return {
      showModal: false,
      loginLoading: false,
      nip: null,
      password: null,
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
    titleRoute() {
      return this.$route.meta.title
    },
    userData() {
      return localStorage.getItem('userData')
    },
  },
  methods: {
    permintaan() {
      if (!this.userData) this.showModal = true
    },
    logout() {
      console.info('aaa')
      localStorage.removeItem('userData')
      localStorage.removeItem('token')
      // Redirect to login page
      this.$router.push({ name: 'login' })
    },
    successLogin() {
      this.$toast.open({
        message: `Selamat datanng ${userData.name}`,
        type: 'success',
        duration: 3000,
        position: 'top-right',
        dismissible: true,
      })
    },
    errorNipPwEmpty() {
      this.$toast.open({
        message: 'NIP dan Password diperlukan',
        type: 'error',
        duration: 2000,
        position: 'top',
        dismissible: true,
      })
    },
    login() {
      const data = {
        nip: this.nip,
        password: this.password,
      }
      this.loginLoading = !this.loginLoading
      this.$axios
        .post(`/login`, data)
        .then((response) => {
          if (response.status == 200) {
            this.$axios
              .get(`/profile`, {
                headers: {
                  Authorization: `${response.data.token_type} ${response.data.access_token}`,
                },
              })
              .then((res) => {
                localStorage.setItem('token', JSON.stringify(response.data))
                this.loginLoading = !this.loginLoading
                this.successLogin()
                localStorage.setItem('userData', JSON.stringify(res.data))
                this.showModal = false
              })
          } else if (response.status == 401) {
            console.info('aaa')
          }
          // get data profile setelah dapat token login
        })
        .catch((e) => {
          const error = e.toJSON()
          if (error.status == '401') {
            this.errorNipPwEmpty()
          }
          this.loginLoading = !this.loginLoading
        })
    },
  },
  created() {},
  setup() {
    return {
      user,
      navigation,
      userNavigation,
    }
  },
}
</script>
