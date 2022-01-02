import { createStore } from "vuex";
import * as types from "./mutation-types";

export default createStore({
  state: {
    token: null,
  },
  getters: {
    isAuthenticated(state) {
      state.token = state.token || localStorage.token;
      return state.token;
    },
  },
  mutations: {
    [types.LOGIN](state, token) {
      state.token = token;
      localStorage.token = state.token;
    },
    [types.LOGOUT](state) {
      state.token = null;
      delete localStorage.token;
    },
  },
  actions: {},
  modules: {},
});
