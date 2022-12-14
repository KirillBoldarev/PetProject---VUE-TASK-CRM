import { defineStore } from 'pinia';
import { ref } from 'vue';
import localbase from '@/js/libs/localbase';

export const useAuthenticatedStore = defineStore('authenticated', () => {
  const AUTHENTICATED = ref();
  const IS_AUTHENTICATED = ref(false);

  function AUTHENTICATION(user) {
    AUTHENTICATED.value = user;
    IS_AUTHENTICATED.value = true;
    sessionStorage.setItem('authID', AUTHENTICATED.value.id);
  }

  function LOGOUT() {
    IS_AUTHENTICATED.value = false;
    AUTHENTICATED.value = null;
    sessionStorage.removeItem('authID');
  }

  function UPDATE_AUTHENTICATED(user) {
    AUTHENTICATED.value = user;
  }

  async function INITIALIZE_AUTHENTICATED() {
    const id = sessionStorage.getItem('authID');
    const userList = await localbase.collection('users').get();
    if (id && userList && Array.isArray(userList)) {
      AUTHENTICATED.value = userList.find((user) => user.id === id);
      IS_AUTHENTICATED.value = true;
    }
    if (id && userList && !Array.isArray(userList)) {
      IS_AUTHENTICATED.value = true;
      AUTHENTICATED.value = userList;
    }
  }

  return {
    AUTHENTICATED,
    IS_AUTHENTICATED,
    AUTHENTICATION,
    LOGOUT,
    UPDATE_AUTHENTICATED,
    INITIALIZE_AUTHENTICATED,
  };
});
