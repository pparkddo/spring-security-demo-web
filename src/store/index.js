import { createStore } from "vuex";
import * as mutationTypes from "./mutation-types";
import * as actionTypes from "@/store/action-types";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

const emptyAuth = {
  token: null,
  authorities: [],
};

const isEmptyAuth = (auth) => {
  return auth.token == null && auth.authorities.length === 0;
};

const includesAdmin = (authorities) => {
  return authorities.includes("ADMIN");
};

export default createStore({
  state: {
    auth: {
      token: null,
      authorities: [],
    },
  },
  getters: {
    isAuthenticated(state) {
      if (!isEmptyAuth(state.auth)) {
        return true;
      }

      state.auth = localStorage.auth
        ? JSON.parse(localStorage.auth)
        : emptyAuth;

      return !isEmptyAuth(state.auth);
    },
    isAdmin(state) {
      if (!isEmptyAuth(state.auth)) {
        return includesAdmin(state.auth.authorities);
      }

      state.auth = localStorage.auth
        ? JSON.parse(localStorage.auth)
        : emptyAuth;

      return includesAdmin(state.auth.authorities);
    },
  },
  mutations: {
    [mutationTypes.LOGIN](state, auth) {
      state.auth = auth;
      localStorage.auth = JSON.stringify(state.auth);
    },
    [mutationTypes.LOGOUT](state) {
      state.auth = emptyAuth;
      delete localStorage.auth;
    },
  },
  actions: {
    async [actionTypes.GRANT_ADMIN]({ commit, state }) {
      const response = await fetchWrapper.post("/member/authority/admin");
      const authorities = response.data.map((each) => each.roleName);
      const auth = { token: state.auth.token, authorities: authorities };
      commit(mutationTypes.LOGIN, auth);
    },
  },
  modules: {},
});
