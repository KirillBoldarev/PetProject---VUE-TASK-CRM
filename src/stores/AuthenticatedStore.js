import { defineStore } from 'pinia'
import localbase from '@/js/libs/localbase'

export const useAuthenticatedStore = defineStore('authenticated', {
  state: () => ({
    AUTHENTICATED: null,
    IS_AUTHENTICATED: false
  }),
  getters: {
    IS_AUTH (state) {
      return state.IS_AUTHENTICATED
    },
    GET_AUTH (state) {
      return state.AUTHENTICATED
    }
  },
  actions: {
    AUTHENTICATION (user) {
      this.AUTHENTICATED = user
      this.IS_AUTHENTICATED = true
      sessionStorage.setItem('authID', this.AUTHENTICATED.id)
    },
    LOGOUT () {
      this.IS_AUTHENTICATED = false
      this.AUTHENTICATED = null
      sessionStorage.removeItem('authID')
    },

    async UPDATE_AUTHENTICATED () {
      const id = sessionStorage.getItem('authID')
      const userList = await localbase.collection('users').get()
      if (id && userList && Array.isArray(userList)) {
        this.AUTHENTICATED = userList.find((user) => user.id === id)
        this.IS_AUTHENTICATED = true
      }
      if (id && userList && !Array.isArray(userList)) {
        this.IS_AUTHENTICATED = true
        this.AUTHENTICATED = userList
      }
    }
  }
})
