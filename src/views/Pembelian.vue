<template>
  <form
    class="mt-5 flex flex-col justify-center items-center w-full"
    autocomplete="off"
    @submit.prevent="submit"
  >
    <div class="ml-5 relative sm:rounded-lg grid w-full items-end">
      <button
        @click="toDaftarPembelian"
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
            d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
          />
          <path
            d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
          />
          <path
            d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
          />
        </svg>

        Daftar Pembelian
      </button>
    </div>

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
          :disabled="loading"
          v-model="name"
          type="text"
          class="shadow-md block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    <div class="mt-10 flex w-3/4 overflow-x-auto shadow-md rounded-lg">
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
            v-for="(item, index) in detailPurchase"
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
                :disabled="loading"
                v-model="detailPurchase[index].quantity"
                min="0"
                type="number"
                class="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </td>
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

    <div class="mb-3 mt-5 flex w-3/4 justify-end items-center">
      <label class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300 i"
        >Tanggal</label
      >
      <div class="w-1/3">
        <input
          v-model="tanggal"
          type="date"
          class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pilih tnggal"
          required
        />
      </div>
    </div>

    <div class="mb-3 flex w-3/4 justify-end items-center">
      <label class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300 i"
        >Bukti / Keterangan</label
      >
      <div class="w-1/3">
        <input
          v-model="notes"
          type="text"
          class="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Optional"
        />
      </div>
    </div>

    <div class="flex w-3/4 justify-end items-center">
      <label class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300 i"
        >Lampiran</label
      >
      <div class="w-1/3">
        <input
          ref="myFileInput"
          @change="onChange"
          type="file"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
    <div class="flex w-3/4 justify-end items-center">
      <p class="text-xs mt-1 text-grey-600 dark:text-grey-500">
        <span class="font-medium">* Type </span> | PDF | JPEG | JPG | PNG | ZIP
        | RAR (10 MB Maks)
      </p>
    </div>
    <div
      class="mt-5 flex w-3/4 overflow-x-auto justify-end"
      v-if="detailPurchase.length > 0 ? true : false"
    >
      <button
        :disabled="loading"
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
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      dataProduct: [],
      name: null,
      notes: null,
      tanggal: null,
      detailPurchase: [],
      file: null,
    }
  },
  computed: {
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
  methods: {
    alertMessage(x) {
      this.$swal.fire({
        icon: 'error',
        title: x,
      })
    },
    toDaftarPembelian() {
      this.$router.push({
        name: 'daftar-pembelian',
      })
    },
    onChange(e) {
      if (e.target.files[0]) {
        switch (e.target.files[0].type) {
          case 'image/jpeg':
            break
          case 'image/png':
            break
          case 'image/jpg':
            break
          case 'image/bmp':
            break
          case 'application/pdf':
            break
          case 'application/x-rar-compressed':
            break
          case 'application/zip':
            break
          case 'application/x-zip-compressed':
            break
          default:
            this.$refs.myFileInput.value = ''
            this.alertMessage('Type file tidak sesuai')
            return
        }

        if (e.target.files[0].size > 1024 * 1024 * 10) {
          e.preventDefault()
          this.alertMessage('File terlalu besar (> 10MB)')
          return
        } else {
          this.file = e.target.files[0]
        }
      } else {
        return
      }
    },
    success() {
      this.$swal({
        position: 'top-end',
        icon: 'success',
        title: 'Pembelian telah di Proses, silahkan cek mutasi persediaan',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      })
    },
    uploadingLampiran(master) {
      let data = new FormData()
      data.append('id', master.id)
      data.append('lampiran', this.file)
      this.$axios
        .post(`/purchase/upload-lampiran`, data, {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `${this.token.token_type} ${this.token.access_token}`,
          },
        })
        .then((res) => {
          console.info(res)
          this.loading = !this.loading
          if (res.status == 200) {
          } else if (res.status == 206) {
            this.$swal
              .fire({
                icon: 'error',
                title: res.data.lampiran[0],
              })
              .then((x) => {
                this.success()
                this.$router.push({
                  name: 'detail-pembelian',
                  params: { id: master.id },
                })
              })
          }
        })
    },
    submit() {
      this.loading = !this.loading
      this.$swal
        .fire({
          title: 'Proses?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Proses!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios
              .post(
                `/purchase/store`,
                {
                  user_id: this.userData.id,
                  notes: this.notes,
                  tanggal: this.tanggal,
                  detail: this.detailPurchase,
                },
                {
                  headers: {
                    Authorization: `${this.token.token_type} ${this.token.access_token}`,
                  },
                }
              )
              .then((res) => {
                if (res.status == 200) {
                  this.$store.commit(
                    'app-purchase/SET_PURCHASE_RESULT',
                    res.data.data
                  )
                  if (this.file !== null) {
                    this.uploadingLampiran(res.data.data)
                  }
                  this.loading = !this.loading
                  this.$router.push({
                    name: 'detail-pembelian',
                    params: { id: res.data.data.id },
                  })
                  this.success()
                }
              })
          }
        })
    },
    hapusItem(index) {
      this.detailPurchase.splice(index, 1)
    },
    pilihItem(data) {
      const b = this.detailPurchase.find((d) => d.id === data.id)
      if (b) {
        const index = this.detailPurchase.findIndex((d) => d.id === data.id)
        this.detailPurchase[index].quantity += 1
      } else {
        this.detailPurchase.push({
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
          .then((res) => {
            this.dataProduct = res.data.data.data
          })
          .catch((e) => {
            this.dataProduct = null
          })
      }
    },
  },
}
</script>

<style></style>
