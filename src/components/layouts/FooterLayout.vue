<template>
  <footer class="footer">
    <div class="footer__top"></div>
    <div class="footer__main">
      <strong
        v-if="
          this.$store.getters.IS_AUTH === true &&
          this.$store.getters.GET_AUTH.role === 'Неавторизованный пользователь'
        "
        class="header__title"
      >
        Вам необходимо подать запрос администратору на авторизацию! Обратитесь к
        {{ this.admin }}!
      </strong>
    </div>
    <div class="footer__bottom"></div>
  </footer>
</template>

<script>
export default {
  methods: {},
  computed: {
    admin() {
      let admin = this.userList.find((user) => user.role === "Администратор");
      return `${admin.firstName} ${admin.secondName}`;
    },
  },

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
};
</script>
