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
import { useUsersStore } from '@/stores/UsersStore';

export default {
  props: {},
  computed: {
    ...mapStores(useAuthenticatedStore, useUsersStore),
    admin() {
      const admin = this.usersStore.GET_USER_LIST.find(
        (user) => user.role === 'Администратор'
      );
      return `${admin.firstName} ${admin.secondName}`;
    },
  },
  methods: {},
};
</script>
