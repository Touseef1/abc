import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    image: null, // Initialize token as null
    count: 0
  },
  mutations: {
    profileimage(state, image) {
      state.image = image;
    }
  },
  plugins:[createPersistedState()],
});

export default store;

