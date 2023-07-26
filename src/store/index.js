import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rol: '',
    username: '',
    perfil: '',
    user: {
      token: '',
      isAuthenticated: false,
    },
  },
  
  getters: {
  },
  
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.user.token = localStorage.getItem('token');
        state.user.isAuthenticated = true;
      } else {
        state.user.token = '';
        state.user.isAuthenticated = false;
      }
      
      if (localStorage.getItem('rol')) {
        state.rol = localStorage.getItem('rol');
      }
    },
    
    setToken(state, token) {
      state.user.token = token;
      state.user.isAuthenticated = true;
      localStorage.setItem('token', token); // Guardar el token en el localStorage
    },
    
    setUsername(state, perfil) {
      state.perfil = perfil;
    },
    
    setRol(state, rol) {
      state.rol = rol;
      localStorage.setItem('rol', rol); // Guardar el rol en el localStorage
    },
    
    removeToken(state) {
      state.user.token = '';
      state.user.isAuthenticated = false;
      localStorage.removeItem('token'); // Eliminar el token del localStorage
    },
    
    clearState(state) {
      state.user = {
        token: '',
        isAuthenticated: false,
      };
      state.username = '';
      state.rol = '';
      state.perfil = '';
    }
  },
  
  actions: {
  },
  
  modules: {
  },
  
  plugins: [createPersistedState({
    paths: ['user', 'perfil']
  })]
})

