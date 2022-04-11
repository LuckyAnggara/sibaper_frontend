<template>
  <div class="mt-5 flex flex-col justify-center items-center w-full">
    <div class="flex-col w-1/3 items-center">
      <div class="mb-2 text-center">
        <label
          for="email-adress-icon"
          class="font-medium text-gray-900 dark:text-gray-300"
          >Cari data barang</label
        >
      </div>
      <div class="relative mr-3 mb-2 md:mr-0 md:block">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500"
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
          v-model="name"
          type="text"
          class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        />
        <template v-if="dataProduct !== null || dataProduct.length > 0">
          <div
            class="mt-1 fixed float-right w-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <a
              v-for="item in dataProduct"
              :key="item.name"
              @click="pilihItem(item)"
              class="block relative rounded-t-lg px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              {{ item.name }}
            </a>
          </div>
        </template>
      </div>
    </div>
    <div class="mt-10 flex w-3/4 overflow-x-auto shadow-lg rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-800 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3" style="width: 5%">No</th>
            <th scope="col" class="px-6 py-3" style="width: 60%">
              Nama Barang Persediaan
            </th>
            <th scope="col" class="px-6 py-3" style="width: 20%">Jumlah</th>
            <th scope="col" class="px-6 py-3" style="width: 5%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in detailRequest"
            :key="item.id"
            class="border-b dark:bg-gray-800 dark:border-gray-700 bg-gray-200"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ item.name }}
            </th>
            <td class="px-6 py-4">
              <input
                v-model="detailRequest[index].quantity"
                type="number"
                class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </td>
            <td class="px-6 py-4 text-right">
              <a
                @click="hapusItem(index)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-500"
                ><svg
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  /></svg
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataProduct: [],
      name: null,
      detailRequest: [],
    }
  },
  watch: {
    name(string) {
      this.getData(string)
    },
  },
  methods: {
    hapusItem(index) {
      this.detailRequest.splice(index, 1)
    },
    pilihItem(data) {
      const b = this.detailRequest.find(d => d.id === data.id)
      if (b) {
        const index = this.detailRequest.findIndex(d => d.id === data.id)
        this.detailRequest[index].quantity += 1
      } else {
        this.detailRequest.push({
          id: data.id,
          name: data.name,
          quantity: 1,
        })
      }
      this.dataProduct = []
      this.name = null
    },
    getData(string) {
      if (string == '' || null) {
        this.dataProduct = []
      } else {
        this.$axios
          .get(`/product?name=${string}`)
          .then(res => {
            this.dataProduct = res.data.data.data
          })
          .catch(e => {
            this.dataProduct = null
          })
      }
    },
  },
}
</script>

<style></style>
