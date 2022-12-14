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

<script setup>
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useUsersStore } from '@/stores/UsersStore';
import { computed } from 'vue';

const authenticatedStore = useAuthenticatedStore();
const usersStore = useUsersStore();

const admin = computed(() => {
  let person = usersStore.USER_LIST.find(
    (user) => user.role === 'Администратор'
  );
  return person.fullname;
});
</script>
