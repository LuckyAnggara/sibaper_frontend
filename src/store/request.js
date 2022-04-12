export default {
  namespaced: true,
  state: {
    requestResult: null,
  },
  getters: {
    getRequestResult: (state) => state.requestResult,
  },
  mutations: {
    SET_REQUEST_RESULT(state, data) {
      state.requestResult = data
    },
  },
}
