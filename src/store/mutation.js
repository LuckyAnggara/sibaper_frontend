export default {
  namespaced: true,
  state: {
    mutation: [],
    loading: true,
  },
  getters: {
    getTotalData: state => state.mutation.length,
    getMutation: state => (a, b) => {
      let saldo = 0
      state.mutation.forEach(x => {
        saldo = saldo + x.debit - x.kredit
        x.saldo = saldo
      })
      return state.mutation.slice(a, b)
    },
    getLoading: state => state.loading,
  },
  mutations: {
    SET_MUTATION(state, data) {
      state.mutation = data
    },

    SET_LOADING(state, data) {
      state.loading = data
    },
  },
}
