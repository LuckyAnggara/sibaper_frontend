<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="hidden-print min-h-full">
    <Disclosure as="nav" class="bg-white" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8" src="../../assets/logo.png" alt="Workflow" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.name.toLowerCase() == $route.name
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="item.name == $route.name ? 'page' : undefined"
                  >{{ item.name }}</a
                >
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
                      <MenuItem>
                        <a
                          href="#"
                          class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                          >{{ userData.name }}</a
                        >
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                          >History</a
                        >
                      </MenuItem>
                      <MenuItem>
                        <a
                          @click="logout"
                          href="#"
                          class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                          >Sign Out</a
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
              class="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              item.name.toLowerCase() == $route.name
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.name == $route.name ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="../../assets/avatar.png"
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
        <router-view />
        <!-- /End replace -->
      </div>
    </main>
  </div>
  <vue-final-modal
    v-model="showModal"
    name="loginModal"
    classes="flex justify-center items-center"
    content-class="relative p-4 w-full max-w-md h-full md:h-auto"
  >
    <Login-Modal />
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
import { VueFinalModal, $vfm } from 'vue-final-modal'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { getNavigation } from '../../routes'
import LoginModal from '../component/LoginModal.vue'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: './src/assets/avatar.png',
}
const userNavigation = [
  { name: 'Your Profile', href: '#', click: '' },
  { name: 'Settings', href: '#', click: '' },
  { name: 'Sign out', href: '#' },
]

export default {
  components: {
    LoginModal,
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
    }
  },
  computed: {
    navigation() {
      return this.$store.getters['app-menu/getMenu']
    },
    currentRouteName() {
      return this.$route.name
    },
    titleRoute() {
      return this.$route.meta.title
    },
    userData() {
      return this.$store.getters['app-user/getUserData']
    },
  },
  methods: {
    openLoginModal() {
      this.$vfm.show('loginModal')
    },
    logout() {
      localStorage.removeItem('userData')
      localStorage.removeItem('token')
      this.$store.commit('app-user/SET_USER_DATA')
      this.$store.commit('app-user/SET_TOKEN')
      // Redirect to login page
      this.$router.push({ name: 'home' })
    },
  },
  created() {
    this.$store.commit('app-user/SET_USER_DATA')
    this.$store.commit('app-user/SET_TOKEN')
  },
  setup() {
    return {
      user,
      userNavigation,
    }
  },
}
</script>
