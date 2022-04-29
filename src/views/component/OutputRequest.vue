<template>
  <div class="mx-auto p-6" style="max-width: 800px">
    <div class="mb-8 text-right">
      <button
        v-if="dataRequest"
        @click="print"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5 -ml-1 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        Print
      </button>
    </div>
    <div
      id="print-area"
      class="p-8 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <template v-if="loading">
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
        <template v-if="dataRequest">
          <div class="flex items-center justify-between mb-8">
            <div>
              <span class="text-2xl">Nomor Ticket #</span>
              {{ dataRequest.no_ticket }}<br />
              <span>Tanggal</span>
              {{ $moment(dataRequest.created_at).format('DD MMM YYYY') }}<br />
            </div>
          </div>

          <div class="flex justify-between mb-8">
            <div>
              Nama : <b>{{ dataRequest.user.name }}</b
              ><br />
              NIP : <b>{{ dataRequest.user.nip }}</b
              ><br />
              Bagian : <b>{{ dataRequest.user.division.name }}</b>
            </div>
          </div>

          <div class="border border-t-2 border-gray-200 mb-8"></div>
          <div>
            <span class="font-medium"> Daftar Permintaan Persediaan </span>
            <div
              v-for="item in dataRequest.detail.filter(
                x => x.status != 'REJECT'
              )"
              :key="item.id"
              class="mt-5 flex justify-between mb-4 bg-gray-200 px-3 py-2"
            >
              <div>{{ item.product.name }}</div>
              <div class="text-right font-medium">
                {{ item.acc_quantity > 0 ? item.acc_quantity : item.quantity }}
                {{ item.product.unit.name }}
              </div>
            </div>
          </div>
          <div class="flex justify-start items-center mb-2 px-3">
            <div class="text-2xl leading-none">
              <span class="mr-5">Status</span>
            </div>
            <div class="text-2xl text-right font-medium">
              {{ dataRequest.status }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex text-center items-center flex-col">
            <span> Data tidak ditemukan </span>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    }
  },
  watch: {
    noTicket() {
      this.getDataTicket()
    },
  },
  created() {
    this.getDataTicket()
  },
  computed: {
    noTicket() {
      return this.$route.params.no_ticket
    },
    dataRequest() {
      return this.$store.getters['app-request/getRequestResult']
    },
    userData() {
      return this.$store.getters['app-user/getUserData']
    },
  },
  methods: {
    getDataTicket() {
      this.$axios
        .get(`/request/get?no_ticket=${this.noTicket}`)
        .then(res => {
          this.loading = !this.loading
          if (res.status == 200) {
            this.$store.commit('app-request/SET_REQUEST_RESULT', res.data.data)
          }
        })
        .catch(e => {
          this.loading = !this.loading
          const error = e.toJSON()
        })
    },
    print() {
      this.$axios({
        url: `/print/get-bukti?id=${this.dataRequest.id}`,
        method: 'GET',
        responseType: 'arraybuffer',
      })
      // .then(response => {
      //   let blob = new Blob([response.data], {
      //     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //   })
      //   let link = document.createElement('a')
      //   link.href = window.URL.createObjectURL(blob)
      //   link.download = 'result.docx'
      //   link.click()
      // })
    },
  },
}
</script>
