<template>
  <template v-if="isLoading">
    <div class="flex text-center items-center flex-col">
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
      <span> Fetching data ... </span>
    </div>
  </template>
  <template v-else>
    <div class="flex flex-row w-full justify-between">
      <div
        class="p-6 w-2/5 bg-gray-200 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <p
          class="text-xl font-medium tracking-tight text-gray-900 dark:text-white"
        >
          Keterangan / Bukti
        </p>
        <p class="mb-4 font-normal text-gray-700 dark:text-gray-400">
          {{ masterData.notes }}
        </p>
        <p
          class="text-xl font-medium tracking-tight text-gray-900 dark:text-white"
        >
          Tanggal Transaksi <br />
        </p>
        <p class="mb-4 font-normal text-gray-700 dark:text-gray-400">
          {{ $moment(masterData.created_at).format('DD MMM YYYY') }}
        </p>
        <p
          class="text-xl font-medium tracking-tight text-gray-900 dark:text-white"
        >
          Lampiran <br />
        </p>
        <p
          class="mb-4 font-normal text-gray-700 dark:text-gray-400"
          v-if="masterData.lampiran == null"
        >
          belum ada lampiran
          <a href="#" class="text-blue-700 font-medium">Click untuk Upload</a>
        </p>
        <template v-else>
          <button
            @click="download(masterData.id)"
            class="font-medium mt-2 text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
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
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
        </template>
        <template>
          <button
            type="submit"
            class="text-white shadow-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <template v-if="!loading">
              Submit
              <svg
                class="w-5 h-5 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
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
        </template>
        <template>
          <button
            @click="print"
            type="button"
            class="text-white shadow-md bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-5 h-5 -ml-2 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print
          </button>
        </template>
      </div>
      <div class="w-3/4 flex h-min ml-10 overflow-x-auto shadow-lg rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-800 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3" style="width: 5%">No</th>
              <th scope="col" class="px-6 py-3" style="width: 60%">
                Nama Persediaan
              </th>
              <th scope="col" class="px-6 py-3" style="width: 20%">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in dataTable"
              :key="item.id"
              class="border-b dark:bg-gray-800 dark:border-gray-700 bg-gray-200"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {{ item.product.name }}
              </th>
              <td class="px-6 py-4">
                {{ item.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      dataTable: null,
      isLoading: false,
      error: false,
      masterData: {},
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    userData() {
      return this.$store.getters['app-user/getUserData']
    },
    token() {
      return this.$store.getters['app-user/getToken']
    },
    dataTable() {
      return this.masterData.detail
    },
  },
  methods: {
    download(id) {
      this.$axios
        .get(`/purchase/get-file?id=${id}`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then(res => {
          this.$axios({
            baseURL: 'http://127.0.0.1:8000/',
            url: `${res.data}`,
          })
        })
    },
    getData() {
      this.isLoading = !this.isLoading
      this.$axios
        .get(`/purchase/get?id=${this.id}`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then(res => {
          this.isLoading = !this.isLoading
          this.masterData = res.data.data
        })
        .catch(e => {
          this.isLoading = !this.isLoading
          this.masterData = {}
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
