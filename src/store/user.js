export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    division: [],
  },
  getters: {
    getUserData: state => state.user,
    getToken: state => state.token,
    getDivision: state => state.division,
  },
  mutations: {
    SET_USER_DATA(state) {
      state.user = JSON.parse(localStorage.getItem('userData'))
    },
    SET_TOKEN(state) {
      state.token = JSON.parse(localStorage.getItem('token'))
    },
    SET_DIVISION(state, data) {
      state.division = data
    },
  },
}
