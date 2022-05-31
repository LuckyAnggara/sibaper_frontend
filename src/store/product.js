export default {
  namespaced: true,
  state: {
    product: {},

    listProduct: [],
    listType: [],
    type: {},
    unit: [],
  },
  getters: {
    getListProduct: state => state.listProduct,
    getProduct: state => state.product,
    // getTempProduct: state => state.tempProduct,
    getType: state => state.listType,
    getTypeChoose: state => state.type,
    getUnit: state => state.unit,
  },
  mutations: {
    SET_LIST_PRODUCT(state, data) {
      state.listProduct = data
    },
    SET_PRODUCT(state, data) {
      state.product = data
    },
    SET_CHOOSE_TYPE(state, data) {
      state.type = data
    },
    SET_TYPE(state, data) {
      state.listType = data
    },
    SET_UNIT(state, data) {
      state.unit = data
    },
    UPDATE_PRODUCT(state, data) {
      state.product.push(data)
    },
  },
}
