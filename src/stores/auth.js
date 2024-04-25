import { defineStore, acceptHMRUpdate } from 'pinia'
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    darkMode: false,
    auth: useLocalStorage('auth' , false)
  }),

  getters: {
    isDarkMode: (state) => state.darkMode,
    isLoggedIn: (state) => state.auth
  },

  actions: {
    changeDarkMode() {
      this.darkMode = !this.darkMode
    },
    login() {
      this.auth = true
    },
    logout() {
      this.auth = false
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}