<template>
  <div class="comment__container flex-column">
    <div class="comment__top">
      <div class="comment__title">
        <strong
          >{{ target.dateOfCreation }} от {{ getPerson(target.author) }}
        </strong>
      </div>
      <button @click="deleteComment">
        <img class="icon" src="@/assets/icons/remove.png" alt="" />
      </button>
    </div>
    <div class="comment__body">
      {{ target.text }}
    </div>
  </div>
</template>

<script>
import { useCommentsStore } from '@/stores/CommentsStore';
import { useUsersStore } from '@/stores/UsersStore';
import { mapStores } from 'pinia';

export default {
  props: {
    target: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useCommentsStore, useUsersStore),
  },
  methods: {
    deleteComment() {
      this.commentsStore.DELETE_COMMENT(this.target);
    },
    getPerson(role) {
      const person = this.usersStore.GET_USER_LIST.find(
        (user) => user.id === role
      );
      if (!person) {
        return 'Пользователь удален';
      }
      if (!person.firstName || !person.secondName) {
        return `${person.login}`;
      }
      return `${person.firstName} ${person.secondName}`;
    },
  },
};
</script>
