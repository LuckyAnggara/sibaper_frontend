export default {
  namespaced: true,
  state: {
    mutation: [],
    loading: true,
    id: null,
  },
  getters: {
    getTotalData: state => state.mutation.length,
    getMutation: state => (a, b) => {
      return state.mutation.slice(a, b)
    },
    getLoading: state => state.loading,
    getId: state => state.id,
  },
  mutations: {
    SET_ID(state, data) {
      state.id = data
    },
    SET_MUTATION(state, data) {
      let saldo = 0
      data.forEach(x => {
        saldo = saldo + x.debit - x.kredit
        x.saldo = saldo
      })
      state.mutation = data.sort((a, b) =>
        b.created_at > a.created_at ? 1 : -1
      )
    },
    SET_LOADING(state, data) {
      state.loading = data
    },
  },
}
