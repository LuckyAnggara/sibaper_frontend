<template>
  <section class="py-10 w-1/2 mx-auto">
    <vue-final-modal
      v-model="showNewJenisModal"
      name="newJenisModal"
      classes="flex justify-center items-center"
      content-class="relative p-4 w-full max-w-md  md:h-auto "
      :prevent-click="isModalLoading"
    >
      <Item-Modal @isModalLoading="modalLoading" @newItem="newItem" />
    </vue-final-modal>
    <vue-final-modal
      v-model="showEditJenisModal"
      name="ubahJenisModal"
      classes="flex justify-center items-center"
      content-class="relative p-4 w-full max-w-md  md:h-auto "
      :prevent-click="isModalLoading"
    >
      <EditJenisModalVue
        @isModalLoading="modalLoading"
        @newItem="newItem"
        @refreshData="getData"
      />
    </vue-final-modal>

    <template v-if="!isLoading">
      <div class="text-center">
        <svg
          role="status"
          class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    </template>

    <template v-else>
      <div v-if="error == false">
        <div class="mb-5 relative flex flex-row justify-items-start">
          <div class="relative sm:rounded-lg grid w-full items-end">
            <button
              @click="openNewJenisModal"
              type="button"
              class="text-white justify-self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-5 h-5 mr-2 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                />
              </svg>

              Tambah
            </button>
          </div>
        </div>

        <div class="relative overflow-x-visible shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3" style="width: 5%">No</th>
                <th scope="col" class="px-6 py-3" style="width: 45%">Nama</th>
                <th scope="col" class="px-6 py-3" style="width: 15%">Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="tableLoading">
                <tr :style="tableLoading == true ? 'height:100px' : ''">
                  <th colspan="4" class="text-center">
                    <div class="text-center">
                      <svg
                        role="status"
                        class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  </th>
                </tr>
              </template>

              <template v-else>
                <template v-if="dataTable.length > 0 ? true : false">
                  <tr
                    v-for="(item, index) in dataTable"
                    :key="item.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {{ index + 1 }}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {{ item.name }}
                    </th>

                    <td class="px-6 py-4">
                      <Menu as="div" class="ml-3">
                        <div>
                          <MenuButton
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                              />
                            </svg>
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
                                @click="ubahData(item)"
                                class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                >Ubah Data</a
                              >
                            </MenuItem>
                            <MenuItem>
                              <a
                                @click="hapus(item)"
                                class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                >Hapus Data</a
                              >
                            </MenuItem>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr style="height: 100px">
                    <th colspan="4" class="text-center mt">
                      <div class="text-center">
                        <span class="text-2xl">Tidak data</span>
                      </div>
                    </th>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="text-center" v-else>
        Services Off. Tolong hubungi teknisi jaringan untuk melakukan
        pengecekan.
      </div>
    </template>
  </section>
</template>

<script>
import ItemModal from './NewJenisModal.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import EditJenisModalVue from './EditJenisModal.vue'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ItemModal,
    EditJenisModalVue,
  },
  data() {
    return {
      productId: null,
      showNewJenisModal: false,
      showEditJenisModal: false,
      tableLoading: false,
      searchName: null,
      limitPage: [5, 10, 25, 100],
      limit:
        localStorage.getItem('limit') === ('' || null)
          ? 5
          : localStorage.getItem('limit'),
      isLoading: true,
      isModalLoading: false,
      error: false,
    }
  },
  computed: {
    userData() {
      return this.$store.getters['app-user/getUserData']
    },
    token() {
      return this.$store.getters['app-user/getToken']
    },
    dataTable() {
      return this.$store.getters['app-product/getType']
    },
  },
  watch: {
    limit(e) {
      localStorage.setItem('limit', e)
      this.limitChange()
    },
  },
  methods: {
    hapus(item) {
      this.$swal
        .fire({
          title: 'Hapus Jenis Data?',
          text: `Melakukan penghapusan jenis data, akan merubah jenis data persediaan yang terkait menjadi null!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
        })
        .then(result => {
          if (result.isConfirmed) {
            this.$axios
              .delete(`/type/destroy/${item.id}`, {
                headers: {
                  Authorization: `${this.token.token_type} ${this.token.access_token}`,
                },
              })
              .then(res => {
                this.loading = !this.loading
                if (res.status == 200) {
                  this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Data telah dihapus',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                  })
                  this.getData()
                }
              })
          } else {
          }
        })
    },
    newItem() {
      this.getData()
    },
    ubahData(x) {
      this.$store.commit('app-product/SET_CHOOSE_TYPE', x)
      this.$vfm.show('ubahJenisModal')
    },
    modalLoading() {
      this.isModalLoading = !this.isModalLoading
    },
    openNewJenisModal() {
      this.$vfm.show('newJenisModal')
    },
    getData() {
      this.isLoading = !this.isLoading
      this.$axios
        .get(`/product/type`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then(res => {
          this.isLoading = !this.isLoading
          this.$store.commit('app-product/SET_TYPE', res.data.data)
        })
        .catch(e => {
          this.isLoading = !this.isLoading
          this.dataTable = {}
          const error = e.toJSON()
          if (e.name == 'Error') {
            this.error = !this.error
          }
        })
    },
  },
  created() {
    this.getData()
  },
}
</script>
