<template>
  <footer class="footer">
    <div class="footer__top" />
    <div class="footer__main">
      <strong
        v-if="
          authenticatedStore.IS_AUTH === true &&
          authenticatedStore.GET_AUTH.role === 'Неавторизованный пользователь'
        "
        class="header__title"
      >
        Вам необходимо подать запрос администратору на авторизацию! Обратитесь к
        {{ admin }}!
      </strong>
    </div>
    <div class="footer__bottom" />
  </footer>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

export default {
  props: {
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapStores(useAuthenticatedStore),
    admin() {
      const admin = this.userList.find((user) => user.role === 'Администратор');
      return `${admin.firstName} ${admin.secondName}`;
    },
  },
  methods: {},
};
</script>
