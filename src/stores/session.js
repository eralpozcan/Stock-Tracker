import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const user = ref(null)
  const darkMode = ref(false)
  const auth = ref(true)

  const isDarkMode = computed(() => darkMode.value)
  const isLoggedIn = computed(() => auth.value)

  function changeDarkMode() {
    darkMode.value = !darkMode.value
  }

  function login() {
    auth.value = true
  }

  function logout() {
    auth.value = false
  }


  return {
    user,
    auth,
    isDarkMode,
    isLoggedIn,
    changeDarkMode,
    login,
    logout
  }

})
