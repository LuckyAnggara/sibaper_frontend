<template>
  <div class="min-h-screen flex justify-center items-center bg-white">
    <div
      class="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col items-center space-y-3"
    >
      <div class="py-8">
        <img width="150" class="-mt-10" src="../assets/logo.png" />
      </div>
      <input
        class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
        placeholder="Nomor Induk Pegawai"
        v-model="nip"
      />
      <div class="flex flex-col space-y-1">
        <input
          class="p-3 border-[1px] border-slate-500 rounded-sm w-80 mb-5"
          placeholder="Password"
          v-model="password"
        />
        <button v-if="!loading" class="font-bold text-[#0070ba]">
          Lupa password?
        </button>
      </div>
      <div class="flex flex-col space-y-5 w-full">
        <button
          class="w-full bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]"
          @click="login"
          v-if="!loading"
        >
          Log in
        </button>
        <div class="flex w-full items-center justify-center" v-if="loading">
          <svg
            role="status"
            class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>

        <div
          class="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative"
        >
          <div class="-mt-1 font-bod bg-white px-5 absolute">atau</div>
        </div>
        <button
          class="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200"
        >
          Belum punya Akun?
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LockClosedIcon } from '@heroicons/vue/solid'
import { getHomeRouteForLoggedInUser } from '../auth'

export default {
  components: {
    LockClosedIcon,
  },
  data() {
    return {
      loading: false,
      info: null,
      nip: null,
      password: null,
    }
  },
  computed: {
    userData() {
      return this.$store.getters['app-user/getUserData']
    },
  },
  methods: {
    successLogin() {
      this.$toast.open({
        message: `Selamat datang ${this.userData.name}`,
        type: 'success',
        duration: 3000,
        position: 'top-right',
        dismissible: true,
      })
    },
    errorNipPwEmpty() {
      this.$toast.open({
        message: 'NIP dan Password salah',
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
      this.loading = !this.loading
      this.$axios
        .post(`/login`, data)
        .then(response => {
          console.info(response)
          // get data profile setelah dapat token login
          this.$axios
            .get(`/profile`, {
              headers: {
                Authorization: `${response.data.token_type} ${response.data.access_token}`,
              },
            })
            .then(res => {
              this.loading = !this.loading

              localStorage.setItem('userData', JSON.stringify(res.data))
              localStorage.setItem('token', JSON.stringify(response.data))

              this.$store.commit('app-user/SET_USER_DATA')
              this.$store.commit('app-user/SET_TOKEN')

              if (this.userData) {
                this.$router.push({ name: 'home' })
                console.info(this.userData)
                this.successLogin()
              }
            })
          // console.info(response)
        })
        .catch(e => {
          this.loading = !this.loading
          const error = e.toJSON()
          if (error.status == '401') {
            this.errorNipPwEmpty()
          }
          this.loginLoading = !this.loginLoading
        })
    },
  },
}
</script>
