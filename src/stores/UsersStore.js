import { defineStore } from 'pinia';
import { ref } from 'vue';
import localbase from '@/js/libs/localbase';

export const useUsersStore = defineStore('users', () => {
  const USER_LIST = ref([]);

  function CREATE_USER(user) {
    USER_LIST.value.push(user);
  }

  function DELETE_USER(payload) {
    let index = USER_LIST.value.findIndex((user) => user.id === payload.id);
    USER_LIST.value.splice(index, 1);
  }

  function EDIT_USER(payload) {
    USER_LIST.value = USER_LIST.value.map((user) =>
      user.id === payload.id ? payload : user
    );
  }
  async function INITIALIZE_USER_LIST() {
    USER_LIST.value = await localbase
      .collection('users')
      .get()
      .catch((error) => console.log(error));
  }

  return {
    USER_LIST,
    CREATE_USER,
    DELETE_USER,
    EDIT_USER,
    INITIALIZE_USER_LIST,
  };
});
