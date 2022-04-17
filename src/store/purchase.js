export default {
  namespaced: true,
  state: {
    purchaseDetail: null,
  },
  getters: {
    getPurchaseResult: state => state.purchaseDetail,
  },
  mutations: {
    SET_PURCHASE_RESULT(state, data) {
      state.purchaseDetail = data
    },
  },
}
