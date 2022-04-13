export default {
  namespaced: true,
  state: {
    product: [],
  },
  getters: {
    getProduct: (state) => state.product,
  },
  mutations: {
    SET_PRODUCT(state, data) {
      state.product = data
    },
    UPDATE_PRODUCT(state, data) {
      state.product.push(data)
    },
  },
}
