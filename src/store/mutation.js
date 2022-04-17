export default {
  namespaced: true,
  state: {
    mutation: [],
    loading: true,
  },
  getters: {
    getMutation: state => state.mutation,
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
