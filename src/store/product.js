export default {
  namespaced: true,
  state: {
    product: {},
    // tempProduct: {
    //   name: null,
    //   id: null,
    //   description: null,
    //   quantity: null,
    //   type_id: null,
    //   type: null,
    //   unit_id: null,
    //   unit: null,
    // },
    listProduct: [],
    type: [],
    unit: [],
  },
  getters: {
    getListProduct: state => state.listProduct,
    getProduct: state => state.product,
    // getTempProduct: state => state.tempProduct,
    getType: state => state.type,
    getUnit: state => state.unit,
  },
  mutations: {
    SET_LIST_PRODUCT(state, data) {
      state.listProduct = data
    },
    SET_PRODUCT(state, data) {
      state.product = data
    },
    // SET_TEMP_PRODUCT(state, data) {
    //   state.tempProduct.name = data.name
    //   state.tempProduct.id = data.id
    //   state.tempProduct.description = data.description
    //   state.tempProduct.quantity = data.quantity
    //   state.tempProduct.type_id = data.type_id
    //   state.tempProduct.type = data.type
    //   state.tempProduct.unit_id = data.unit_id
    //   state.tempProduct.unit = data.unit
    // },

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
