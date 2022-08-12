import { createStore } from "vuex";
import { Login, UserInfo } from "@/api/user";

export default createStore({
  state: {
    token: localStorage.getItem("token"),
    avatar: localStorage.getItem("avatar"),
    username: localStorage.getItem("username"),
    rolse: [],
  },
  getters: {
    token: (state) => state.token,
    avatar: (state) => state.avatar,
    username: (state) => state.username,
    rolse: (state) => state.rolse,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_ROLES: (state, roles) => {
      state.rolse = roles;
    },
  },
  actions: {
    /* login */
    LoginResult({ commit }, useInfo) {
      return new Promise((resolve, reject) => {
        Login(useInfo)
          .then((response) => {
            const { token, code } = response.data;
            if (code === 200) {
              // localStorage设置token
              localStorage.setItem("token", JSON.stringify(token));
              // vuex 设置token
              commit("SET_TIKEN", token);
            }
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /* getUserInfo */
    GetInfo({ commit }, token) {
      return new Promise((resolve, reject) => {
        UserInfo(token)
          .then((response) => {
            const { code, data } = response.data;
            if (code === 200) {
              commit("SET_AVATAR", data.avatar);
              commit("SET_USERNAME", data.username);
              commit("SET_ROLES", data.roles);
              resolve(response.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /* logout */
    LogoutResult({ commit }) {
      commit("SET_AVATAR", "");
      commit("SET_USERNAME", "");
      commit("SET_ROLES", "");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
    },
  },
  modules: {},
});
