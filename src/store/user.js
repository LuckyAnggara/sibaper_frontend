export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  getters: {
    getUserData: state => state.user,
    getToken: state => state.token,
  },
  mutations: {
    SET_USER_DATA(state) {
      state.user = JSON.parse(localStorage.getItem('userData'))
    },
    SET_TOKEN(state) {
      state.token = JSON.parse(localStorage.getItem('token'))
    },
  },
}
