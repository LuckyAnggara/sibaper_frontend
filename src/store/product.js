export default {
  namespaced: true,
  state: {
    product: [],
    type: [],
    unit: [],
  },
  getters: {
    getProduct: (state) => state.product,
    getType: (state) => state.type,
    getUnit: (state) => state.unit,
  },
  mutations: {
    SET_PRODUCT(state, data) {
      state.product = data
    },
    SET_TYPE(state, data) {
      state.type = data
    },
    SET_UNIT(state, data) {
      state.unit = data
    },
    UPDATE_PRODUCT(state, data) {
      state.product.push(data)
    },
  },
}
