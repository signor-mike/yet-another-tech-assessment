import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chips: [
      "Art",
      "Fashion",
      "Travel",
      "Food",
      "Make-up",
      "Business",
      "Beauty",
      "Health",
      "Fitness",
    ],
    registredUsers: [
      { username: "john", socialMedia: "https://instagram.com/john-doe" },
      { username: "jane", socialMedia: "https://instagram.com/jane-doe" },
    ],
    counter: 1,
  },
  mutations: {
    increment(state, n) {
      state.counter += n;
    },
    newUser(state, user) {
      state.registredUsers.push(user);
    },
  },
  actions: {},
  modules: {},
});
