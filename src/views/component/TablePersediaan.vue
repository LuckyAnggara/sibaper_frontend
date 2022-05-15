<template>
  <section class="py-10">
    <vue-final-modal
      v-model="showNewItemModal"
      name="newItemModal"
      classes="flex justify-center items-center"
      content-class="relative p-4 w-full max-w-md  md:h-auto "
      :prevent-click="isModalLoading"
    >
      <Item-Modal @isModalLoading="modalLoading" @newItem="newItem" />
    </vue-final-modal>
    <vue-final-modal
      v-model="showEditItemModal"
      name="ubahItemModal"
      classes="flex justify-center items-center"
      content-class="relative p-4 w-full max-w-md  md:h-auto "
      :prevent-click="isModalLoading"
    >
      <EditItemModal
        @isModalLoading="modalLoading"
        @newItem="newItem"
        @refreshData="getData"
      />
    </vue-final-modal>
    <vue-final-modal
      :lock-scroll="true"
      :prevent-click="true"
      v-model="showMutationModal"
      name="mutationModal"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col max-h-96 mx-4 p-4 border rounded bg-white max-h-screen "
      :fit-parent="true"
      :esc-to-close="true"
    >
      <TableMutation />
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
          <div class="sm:rounded-lg">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                v-model="searchName"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>

          <div class="ml-5 relative sm:rounded-lg flex w-1/4 items-center">
            <label class="flex-initial mr-2 ml-5">Show</label>
            <select
              v-model="limit"
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option v-for="item in limitPage" :key="item.id">
                {{ item }}
              </option>
            </select>
          </div>

          <div class="ml-5 relative sm:rounded-lg grid w-full items-end">
            <button
              @click="openNewItemModal"
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

                <th scope="col" class="px-6 py-3" style="width: 20%">Jenis</th>
                <th scope="col" class="px-6 py-3" style="width: 15%">
                  Saldo Akhir
                </th>
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
                <template v-if="dataTable.data.length > 0 ? true : false">
                  <tr
                    v-for="(item, index) in dataTable.data"
                    :key="item.id"
                    :class="[
                      index == 0 && baru == true
                        ? 'bg-green-100 border-b dark:bg-green-800 dark:border-gray-700'
                        : 'bg-white border-b dark:bg-gray-800 dark:border-gray-700',
                    ]"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {{ dataTable.from + index }}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {{ item.name }}
                      <span
                        v-if="index == 0 && baru == true"
                        class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
                        >New</span
                      >
                    </th>

                    <td class="px-6 py-4">
                      {{ item.type.name }}
                    </td>
                    <td class="px-6 py-4">
                      {{ item.quantity == null ? 0 : item.quantity }}
                      {{ item.unit.name }}
                    </td>
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
                                @click="openMutationModal(item.id)"
                                class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                >Cek Mutasi</a
                              >
                            </MenuItem>
                            <MenuItem>
                              <a
                                @click="ubahData(item.id)"
                                class="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                >Ubah Data</a
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

        <div class="mt-5 flex flex-col items-center">
          <!-- Help text -->
          <span class="text-sm text-gray-700 dark:text-gray-400">
            Data
            <span class="font-semibold text-gray-900 dark:text-white">{{
              dataTable.from
            }}</span>
            sampai
            <span class="font-semibold text-gray-900 dark:text-white">{{
              dataTable.to
            }}</span>
            dari
            <span class="font-semibold text-gray-900 dark:text-white">{{
              dataTable.total
            }}</span>
            Data
          </span>
          <div class="inline-flex mt-2 xs:mt-0">
            <!-- Buttons -->
            <button
              :disabled="dataTable.current_page == 1"
              @click="previous"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 disabled:bg-gray-600 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                class="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
            <button
              :disabled="dataTable.current_page == dataTable.last_page"
              @click="next"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 disabled:bg-gray-600 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                class="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
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
import ItemModal from './NewItemModal.vue'
import TableMutation from './TableMutation.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import EditItemModal from './EditItemModal.vue'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ItemModal,
    TableMutation,
    EditItemModal,
  },
  data() {
    return {
      productId: null,
      showNewItemModal: false,
      showEditItemModal: false,
      showMutationModal: false,
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
      baru: false,
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
      return this.$store.getters['app-product/getListProduct']
    },
  },
  watch: {
    limit(e) {
      localStorage.setItem('limit', e)
      this.limitChange()
    },
    searchName() {
      this.searchChange()
    },
  },
  methods: {
    openMutationModal(x) {
      this.productId = x
      this.$store.commit('app-mutation/SET_ID', x)
      this.$store.commit('app-mutation/SET_LOADING', true)
      this.getMutation(this.productId)
      this.$vfm.show('mutationModal')
    },
    newItem() {
      this.getData()
      this.baru = true
    },
    ubahData(x) {
      const b = this.dataTable.data.find(y => {
        if (y.id === x) {
          this.$store.commit('app-product/SET_PRODUCT', y)
          // this.$store.commit('app-product/SET_TEMP_PRODUCT', y)
        }
      })
      this.$vfm.show('ubahItemModal')
    },
    modalLoading() {
      this.isModalLoading = !this.isModalLoading
    },
    openNewItemModal() {
      this.$vfm.show('newItemModal')
    },
    getData() {
      this.baru = false
      this.isLoading = !this.isLoading
      this.$axios
        .get(`/product?limit=${this.limit}`)
        .then(res => {
          this.isLoading = !this.isLoading
          this.$store.commit('app-product/SET_LIST_PRODUCT', res.data.data)
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
    searchChange() {
      this.tableLoading = !this.tableLoading
      this.$axios
        .get(`/product?limit=${this.limit}&name=${this.searchName}`)
        .then(res => {
          this.tableLoading = !this.tableLoading

          this.$store.commit('app-product/SET_LIST_PRODUCT', res.data.data)
        })
    },
    limitChange() {
      this.tableLoading = !this.tableLoading
      this.$axios.get(`/product?limit=${this.limit}`).then(res => {
        this.tableLoading = !this.tableLoading

        this.$store.commit('app-product/SET_LIST_PRODUCT', res.data.data)
      })
    },
    next() {
      let params = ''
      if (this.searchName !== null || '') {
        params = `&name=${this.searchName}`
      }

      this.tableLoading = !this.tableLoading
      this.$axios
        .get(`${this.dataTable.next_page_url}&limit=${this.limit + params}`)
        .then(res => {
          this.tableLoading = !this.tableLoading

          this.$store.commit('app-product/SET_LIST_PRODUCT', res.data.data)
        })
    },
    previous() {
      let params = ''
      if (this.searchName !== null || '') {
        params = `&name=${this.searchName}`
      }
      this.tableLoading = !this.tableLoading
      this.$axios
        .get(`${this.dataTable.prev_page_url}&limit=${this.limit + params}`)
        .then(res => {
          this.tableLoading = !this.tableLoading

          this.$store.commit('app-product/SET_LIST_PRODUCT', res.data.data)
        })
    },
    // MUTASI
    getMutation(x) {
      this.$axios
        .get(`/mutation/get?id=${x}`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then(res => {
          if (res.status == 200) {
            this.$store.commit('app-mutation/SET_MUTATION', res.data)
            this.$store.commit('app-mutation/SET_LOADING', false)
          }
        })
    },
    // mutationLimitChange(limit) {
    //   this.$store.commit('app-mutation/SET_LOADING', true)
    //   this.$axios
    //     .get(
    //       `/mutation/get?id=${this.productId}&limit=${limit}&id=${this.productId}`,
    //       {
    //         headers: {
    //           Authorization: `${this.token.token_type} ${this.token.access_token}`,
    //         },
    //       }
    //     )
    //     .then(res => {
    //       if (res.status == 200) {
    //         this.$store.commit('app-mutation/SET_MUTATION', res.data)
    //         this.$store.commit('app-mutation/SET_LOADING', false)
    //       }
    //     })
    // },
    // mutationNext(link, limit) {
    //   this.$store.commit('app-mutation/SET_LOADING', true)
    //   this.$axios
    //     .get(`${link}&limit=${limit}&id=${this.productId}`, {
    //       headers: {
    //         Authorization: `${this.token.token_type} ${this.token.access_token}`,
    //       },
    //     })
    //     .then(res => {
    //       if (res.status == 200) {
    //         this.$store.commit('app-mutation/SET_MUTATION', res.data)
    //         this.$store.commit('app-mutation/SET_LOADING', false)
    //       }
    //     })
    // },
    // mutationPrevious(link, limit) {
    //   this.$store.commit('app-mutation/SET_LOADING', true)
    //   this.$axios
    //     .get(`${link}&limit=${limit}&id=${this.productId}`, {
    //       headers: {
    //         Authorization: `${this.token.token_type} ${this.token.access_token}`,
    //       },
    //     })
    //     .then(res => {
    //       if (res.status == 200) {
    //         this.$store.commit('app-mutation/SET_MUTATION', res.data)
    //         this.$store.commit('app-mutation/SET_LOADING', false)
    //       }
    //     })
    // },
    // mutationSearch(searchTerm, limit) {
    //   this.$store.commit('app-mutation/SET_LOADING', true)
    //   this.$axios
    //     .get(
    //       `/mutation/get?search_term=${searchTerm}&limit=${limit}&id=${this.productId}`,
    //       {
    //         headers: {
    //           Authorization: `${this.token.token_type} ${this.token.access_token}`,
    //         },
    //       }
    //     )
    //     .then(res => {
    //       this.$store.commit('app-mutation/SET_MUTATION', res.data)
    //       this.$store.commit('app-mutation/SET_LOADING', false)
    //     })
    // },

    getType() {
      this.$axios
        .get(`/product/type`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then(res => {
          if (res.status == 200) {
            this.$store.commit('app-product/SET_TYPE', res.data.data)
          }
        })
    },
    getUnit() {
      this.$axios
        .get(`/product/unit`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then(res => {
          if (res.status == 200) {
            this.$store.commit('app-product/SET_UNIT', res.data.data)
          }
        })
    },
  },
  created() {
    this.getData()
    this.getType()
    this.getUnit()
  },
}
</script>
