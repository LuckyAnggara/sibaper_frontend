import { getNavigation } from '../routes'

export default {
  namespaced: true,
  state: {
    menu: getNavigation(),
  },
  getters: {
    getMenu: (state) => state.menu,
  },
  mutations: {
    SET_MENU(state, data) {
      console.info(data)
      state.menu = data
    },
  },
}
