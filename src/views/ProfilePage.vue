<template>
  <div class="min-h-screen">
    <div class="container mx-auto">
      <div class="inputs w-full max-w-2xl p-6 mx-auto">
        <h2 class="text-2xl text-gray-900">Account Setting</h2>
        <form class="mt-6 border-t border-gray-400 pt-4">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-text-1"
                >Nomor Induk Pegawai</label
              >
              <input
                class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                disabled
                :value="userData.nip"
              />
            </div>

            <div class="flex flex-row w-full">
              <template v-if="!changePassword">
                <div class="w-full md:w-full px-3 mb-6 flex flex-col">
                  <div class="mb-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      >password</label
                    >
                    <button
                      @click="changePassword = !changePassword"
                      class="shadow-md text-white justify-self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-full md:w-full px-3 mb-6 flex flex-col">
                  <div class="mb-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      >password</label
                    >
                    <button
                      @click="cancel"
                      class="shadow-md text-white justify-self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Cancel
                    </button>
                  </div>
                  <div class="mt-5">
                    <button
                      @click="submitPassword"
                      type="button"
                      class="shadow-md text-white justify-self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <template v-if="!loading"> Submit </template>
                      <template v-else>
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
                        Processing...
                      </template>
                    </button>
                  </div>
                </div>
                <div class="w-full md:w-full px-3 mb-6">
                  <div class="mb-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      >Password Lama</label
                    >
                    <input
                      :disabled="loading"
                      ref="password_input"
                      class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="password"
                      v-model="password_lama"
                    />
                    <p
                      class="text-sm text-red-600 dark:text-red-500"
                      v-if="error"
                    >
                      <span class="font-medium">Oops!</span> Password lama salah
                    </p>
                  </div>
                  <div class="mt-4">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      >Password Baru</label
                    >
                    <input
                      :disabled="loading"
                      v-model="password_baru"
                      class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="password"
                    />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </form>
      </div>
      <div class="inputs w-full max-w-2xl p-6 mx-auto">
        <h2 class="text-2xl text-gray-900">Profile</h2>
        <form class="mt-6 border-t border-gray-400 pt-4">
          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-text-1"
                >Nama Lengkap</label
              >
              <input
                :disabled="loadingChange"
                class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                v-model="userData.name"
              />
            </div>
            <div class="w-full md:w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Nama Bagian</label
              >
              <select
                required
                v-model="userData.division_id"
                class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  v-for="item in division"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
              <!-- <input
                :disabled="true"
                class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                v-model="userData.division.name"
              /> -->
            </div>
          </div>
        </form>
      </div>
      <div class="inputs w-full max-w-2xl p-6 mx-auto">
        <button
          @click="saveChange"
          class="shadow-md text-white justify-self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          <template v-if="!loadingChange"> Save Change </template>
          <template v-else>
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
            Processing...
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      changePassword: false,
      password_lama: null,
      password_baru: null,
      error: false,
      loadingChange: false,
    }
  },
  computed: {
    userData() {
      return this.$store.getters['app-user/getUserData']
    },
    token() {
      return this.$store.getters['app-user/getToken']
    },
    division() {
      return this.$store.getters['app-user/getDivision']
    },
  },
  methods: {
    cancel() {
      this.changePassword = !this.changePassword
      this.password_lama = null
      this.password_baru = null
      this.error = false
    },
    submitPassword() {
      this.loading = !this.loading
      this.$swal
        .fire({
          title: 'Ganti Password?',
          text: 'Password akan ganti',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
        })
        .then(result => {
          if (result.isConfirmed) {
            this.$axios
              .post(
                `/change-password`,
                {
                  password_lama: this.password_lama,
                  password_baru: this.password_baru,
                },
                {
                  headers: {
                    Authorization: `${this.token.token_type} ${this.token.access_token}`,
                  },
                }
              )
              .then(res => {
                this.loading = !this.loading
                this.error = false
                if (res.status == 200) {
                  this.cancel()
                  this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Password berhasil di ganti',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                  })
                }
              })
              .catch(e => {
                this.loading = !this.loading
                const error = e.toJSON()
                if (error.status == 422) {
                  this.error = true
                  this.$refs.password_input.focus()
                }
              })
          } else {
            this.loading = !this.loading
          }
        })
    },
    saveChange() {
      this.loadingChange = !this.loadingChange
      this.$swal
        .fire({
          title: 'Ubah data?',
          text: 'Profile akan di perbaharui',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
        })
        .then(result => {
          if (result.isConfirmed) {
            this.$axios
              .post(
                `/update-profile`,
                {
                  name: this.userData.name,
                  division_id: this.userData.division_id,
                },
                {
                  headers: {
                    Authorization: `${this.token.token_type} ${this.token.access_token}`,
                  },
                }
              )
              .then(res => {
                this.loadingChange = !this.loadingChange
                this.error = false
                if (res.status == 200) {
                  localStorage.setItem('userData', JSON.stringify(res.data))
                  this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Profile berhasil di perbaharui',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                  })
                }
              })
              .catch(e => {
                this.loadingChange = !this.loadingChange
                const error = e.toJSON()
                if (error.status == 422) {
                  this.error = true
                }
              })
          } else {
            this.loadingChange = !this.loadingChange
          }
        })
    },
    getDivision() {
      this.$axios.get(`/user/division`).then(res => {
        if (res.status == 200) {
          this.$store.commit('app-user/SET_DIVISION', res.data.data)
        }
      })
    },
  },
  created() {
    this.getDivision()
  },
}
</script>
