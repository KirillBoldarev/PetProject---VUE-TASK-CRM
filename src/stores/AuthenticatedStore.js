import { defineStore } from 'pinia';
import { ref } from 'vue';
import localbase from '@/js/libs/localbase';

export const useAuthenticatedStore = defineStore('AUTH', () => {
  const AUTH = ref();
  const IS_AUTH = ref(false);

  function AUTHENTICATION(user) {
    AUTH.value = user;
    IS_AUTH.value = true;
    sessionStorage.setItem('authID', AUTH.value.id);
  }

  function LOGOUT() {
    IS_AUTH.value = false;
    AUTH.value = null;
    sessionStorage.removeItem('authID');
  }

  function UPDATE_AUTHENTICATED(user) {
    AUTH.value = user;
  }

  async function INITIALIZE_AUTHENTICATED() {
    const id = sessionStorage.getItem('authID');
    const userList = await localbase.collection('users').get();
    if (id && userList && Array.isArray(userList)) {
      AUTH.value = userList.find((user) => user.id === id);
      IS_AUTH.value = true;
    }
    if (id && userList && !Array.isArray(userList)) {
      IS_AUTH.value = true;
      AUTH.value = userList;
    }
  }

  return {
    AUTH,
    IS_AUTH,
    AUTHENTICATION,
    LOGOUT,
    UPDATE_AUTHENTICATED,
    INITIALIZE_AUTHENTICATED,
  };
});
