<template>
  <div class="flex justify-end p-2">
    <h3 class="px-4 py-5 text-xl font-medium text-gray-900 dark:text-white">
      Tabel mutasi persediaan
    </h3>
    <button
      @click="closeModal"
      type="button"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
  <div class="relative bg-white">
    <form @submit.prevent="print" class="px-5 py-2">
      <div class="mb-2 w-20">
        <button
          type="submit"
          class="text-white justify-self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <template v-if="!printLoading">
            <svg
              class="w-5 h-5 mr-2 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                clip-rule="evenodd"
              />
            </svg>

            Proses
          </template>
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

      <div
        class="relative overflow-x-auto overflow-y-auto h-80 shadow-md sm:rounded-lg mt-5"
      >
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3" style="width: 5%">No</th>
              <th scope="col" class="px-6 py-3" style="width: 25%">
                Tanggal Transaksi
              </th>
              <th scope="col" class="px-6 py-3" style="width: 25%">
                No Bukti / Keterangan
              </th>
              <th scope="col" class="px-6 py-3" style="width: 20%">Masuk</th>
              <th scope="col" class="px-6 py-3" style="width: 20%">Keluar</th>
              <th scope="col" class="px-6 py-3" style="width: 20%">Total</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="isLoading">
              <tr :style="isLoading == true ? 'height:100px' : ''">
                <th colspan="6" class="text-center items-center">
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
              <template v-if="dataTable.length > 0">
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  v-for="(item, index) in dataTable"
                  :key="item.id"
                >
                  <th
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {{ parseInt(from) + parseInt(index) }}
                  </th>
                  <th
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <!-- {{ item.created_at }} -->
                    {{ $moment(item.created_at).format('DD MMMM YYYY') }}
                  </th>
                  <th
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {{ item.keterangan }}
                  </th>
                  <th
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {{ item.debit }}
                  </th>
                  <th
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {{ item.kredit }}
                  </th>
                  <th
                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {{ item.saldo }}
                  </th>
                </tr>
              </template>
              <template v-else>
                <tr style="height: 100px">
                  <th colspan="6" class="text-center mt">
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
            from
          }}</span>
          sampai
          <span class="font-semibold text-gray-900 dark:text-white">{{
            b
          }}</span>
          dari
          <span class="font-semibold text-gray-900 dark:text-white">{{
            total_data
          }}</span>
          Data
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            :disabled="current_page == 1"
            @click="prevPage"
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
            :disabled="current_page == last_page"
            @click="nextPage"
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
    </form>
  </div>
</template>

<script>
import { baseUrl } from '../../axios'
export default {
  data() {
    return {
      printLoading: false,
      error: false,
      current_page: 1,
      from: 1,
      a: 0,
      b: 10,
    }
  },
  computed: {
    last_page() {
      return Math.ceil(this.total_data / 10)
    },
    total_data() {
      return this.$store.getters['app-mutation/getTotalData']
    },
    isLoading() {
      return this.$store.getters['app-mutation/getLoading']
    },
    dataTable() {
      var a = this.$store.getters['app-mutation/getMutation'](this.a, this.b)

      return a
    },
    tableLoading() {
      if (this.dataTable.length > 0) {
        return false
      } else {
        return true
      }
    },
  },
  created() {},
  methods: {
    print() {
      this.printLoading = true
      setTimeout(() => {
        this.printLoading = false
        window.open(
          `${baseUrl}/laporan/mutation?id=${this.$store.getters['app-mutation/getId']}`
        )
      }, 500)
    },
    closeModal() {
      this.from = 1
      this.current_page = 1
      this.a = 0
      this.b = 10
      this.$vfm.hide('mutationModal')
    },
    nextPage() {
      this.from = this.from + this.b

      const sampai_ke = this.b + 10
      if (sampai_ke > this.total_data) {
        this.b = this.total_data
      } else {
        this.b = this.b + 10
      }
      this.a = this.a + 10
      this.current_page++
    },
    prevPage() {
      this.from = this.from - 10
      this.a = this.a - 10
      if (this.b == this.total_data) {
        this.b = this.b - (this.total_data - 10)
      } else {
        this.b = this.b - 10
      }
      this.current_page--
    },
  },
  props: {
    productId: Number,
  },
}
</script>
