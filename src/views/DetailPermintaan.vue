<template>
  <form autocomplete="off" @submit.prevent="submit">
    <div class="flex flex-row w-full justify-between overflow-auto">
      <div
        class="p-6 w-2/5 bg-gray-200 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <template v-if="masterRequest.status == 'PENDING'">
          <span
            class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
            >{{ masterRequest.status }}</span
          >
        </template>
        <template v-else-if="masterRequest.status == 'ACCEPT'">
          <span
            class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
            >{{ masterRequest.status }}</span
          >
        </template>
        <template v-else-if="masterRequest.status == 'REJECT'">
          <span
            class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
            >{{ masterRequest.status }}</span
          >
        </template>
        <h3
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Nomor Ticket #{{ masterRequest.no_ticket }}
        </h3>
        <p class="mb-2 font-normal text-gray-700 dark:text-gray-400 border-b-4">
          Catatan
        </p>

        <p
          class="mb-8 font-normal text-gray-700 dark:text-gray-400"
          style="white-space: pre"
        >
          {{
            masterRequest.notes == null
              ? 'Tidak ada catatan'
              : masterRequest.notes
          }}
        </p>
        <template v-if="masterRequest.status == 'PENDING'">
          <div class="flex flex-col justify-center items-start">
            <button
              type="submit"
              class="mb-5 text-white shadow-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <button
              type="button"
              @click="reject"
              class="text-white shadow-md bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <template v-if="!loading">
                Reject

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
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
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
          </div>
        </template>
        <template v-else-if="masterRequest.status == 'ACCEPT'">
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
      <div class="w-3/4 flex-col ml-10">
        <div class="flex overflow-auto shadow-lg rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-800 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3" style="width: 5%">No</th>
                <th scope="col" class="px-6 py-3" style="width: 30%">
                  Nama Persediaan
                </th>
                <th scope="col" class="px-6 py-3" style="width: 20%">
                  Sisa Saldo
                </th>
                <th scope="col" class="px-6 py-3" style="width: 25%">
                  Permintaan
                </th>
                <th
                  scope="col"
                  class="px-6 py-3"
                  style="width: 5%"
                  v-if="masterRequest.status == 'ACCEPT'"
                >
                  Di Setujui
                </th>
                <th scope="col" class="px-6 py-3" style="width: 5%">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in detailRequest"
                :key="item.id"
                class="border-b dark:bg-gray-800 dark:border-gray-700 bg-gray-200"
              >
                <th
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {{ index + 1 }}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {{ item.product.name }}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {{ item.product.quantity }}
                </th>
                <th
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap flex-row flex"
                >
                  <template v-if="masterRequest.status == 'PENDING'">
                    <input
                      :disabled="loading"
                      v-model="detailRequest[index].quantity"
                      type="number"
                      class="block p-2 w-1/2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <template
                      v-if="
                        item.product.quantity >= detailRequest[index].quantity
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 ml-3 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </template>

                    <template v-else>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-7 w-7 ml-3 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </template>
                  </template>
                  <template v-else>
                    {{ item.quantity }}
                  </template>
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  v-if="masterRequest.status == 'ACCEPT'"
                >
                  {{ item.acc_quantity }}
                </th>
                <td class="px-6 py-4 text-right">
                  <button
                    :disabled="loading"
                    @click="hapusItem(index)"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="error > 0 && masterRequest.status == 'PENDING'"
          class="flex overflow-x-auto"
        >
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Terdapat jumlah permintaan persediaan yang melebihi
            <span class="font-medium text-blue-600 dark:text-blue-500"
              >Saldo tersedia</span
            >.
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      detailRequest: [],
      masterRequest: {
        id: null,
      },
      loading: false,
    }
  },
  computed: {
    error() {
      let total = 0
      this.detailRequest.forEach((x) => {
        if (x.product.quantity < x.quantity) {
          total += 1
        }
      })
      return total
    },
    noTicket() {
      return this.$route.params.no_ticket
    },
    userData() {
      return this.$store.getters['app-user/getUserData']
    },
    token() {
      return this.$store.getters['app-user/getToken']
    },
  },
  watch: {
    name(string) {
      this.getData(string)
    },
  },
  created() {
    this.getData()
  },
  methods: {
    success() {
      this.$swal({
        position: 'top-end',
        icon: 'success',
        title: `Permintaan nomor ticket ${this.noTicket} telah di proses`,
        showConfirmButton: false,
        timer: 2500,
        toast: true,
      })
      this.$router.push({
        name: 'daftar-permintaan',
      })
    },
    submit() {
      this.loading = !this.loading
      this.$swal
        .fire({
          title: 'Proses?',
          text:
            this.error > 0
              ? 'Masih ada permintaan persediaan yang melebihi Saldo tersedia. Permintaan yang melebihi saldo tersedia tidak akan di proses.'
              : 'Status permintaan akan di terima, jumlah persediaan akan berubah.',
          icon: this.error > 0 ? 'warning' : 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios
              .put(
                `/request/update`,
                {
                  id: this.masterRequest.id,
                  detail: this.detailRequest,
                  status: 'ACCEPT',
                },
                {
                  headers: {
                    Authorization: `${this.token.token_type} ${this.token.access_token}`,
                  },
                }
              )
              .then((res) => {
                this.loading = !this.loading
                if (res.status == 200) {
                  this.success()
                }
              })
          } else {
            this.loading = !this.loading
          }
        })
    },
    reject() {
      this.loading = !this.loading
      this.$swal
        .fire({
          title: 'Reject?',
          text: 'Permintaan akan di tolak',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Tolak!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios
              .put(
                `/request/update`,
                {
                  id: this.masterRequest.id,
                  detail: this.detailRequest,
                  status: 'REJECT',
                },
                {
                  headers: {
                    Authorization: `${this.token.token_type} ${this.token.access_token}`,
                  },
                }
              )
              .then((res) => {
                this.loading = !this.loading
                if (res.status == 200) {
                  this.$swal({
                    position: 'top-end',
                    icon: 'warning',
                    title: `Permintaan nomor ticket ${this.noTicket} di tolak`,
                    showConfirmButton: false,
                    timer: 2500,
                    toast: true,
                  })
                }
              })
          } else {
            this.loading = !this.loading
          }
        })
    },
    hapusItem(index) {
      this.detailRequest.splice(index, 1)
    },
    getData() {
      this.$axios
        .get(`/request/get-admin?no_ticket=${this.noTicket}`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then((res) => {
          this.masterRequest = res.data.data
          this.detailRequest = res.data.data.detail
        })
        .catch((e) => {
          this.detailRequest = null
        })
    },
    print() {
      console.info('aa')
      this.$axios
        .get(`/print/get?id=${this.masterRequest.id}`, {
          headers: {
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then((res) => {
          link.href = `http://127.0.0.1:8000/${res.data}`
          // this.$axios({
          //   url: `${res.data}`,
          // })
        })
    },
  },
}
</script>

<style></style>
