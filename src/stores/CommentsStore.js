import { defineStore } from 'pinia';
import { ref } from 'vue';
import localbase from '@/js/libs/localbase';

export const useCommentsStore = defineStore('comments', () => {
  const COMMENTS = ref([]);

  function CREATE_COMMENT(payload) {
    COMMENTS.value.push(payload);
  }

  function DELETE_COMMENT(payload) {
    let index = COMMENTS.value.findIndex(
      (comment) => comment.id === payload.id
    );
    COMMENTS.value.splice(index, 1);
  }

  function CLEAR_COMMENTS() {
    COMMENTS.value = null;
  }

  async function INITIALIZE_COMMENTS(taskId) {
    const commetsList = await localbase
      .collection('comments')
      .get()
      .catch((error) => console.log(error));
    COMMENTS.value = commetsList.filter((comment) => comment.task === taskId);
  }

  return {
    COMMENTS,
    CREATE_COMMENT,
    DELETE_COMMENT,
    CLEAR_COMMENTS,
    INITIALIZE_COMMENTS,
  };
});
