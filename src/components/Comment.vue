<template>
  <div class="comment__container flex-column">
    <div class="comment__top">
      <div class="comment__title">
        <strong
          >{{ target.dateOfCreation }} от {{ getPerson(target.author) }}
        </strong>
      </div>
      <img
        @click="deleteComment"
        class="icon"
        src="@/icons/remove.png"
        alt=""
      />
    </div>
    <div class="comment__body">{{ target.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: Object,
      required: false,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    deleteComment() {
      this.$store.commit("DELETE_COMMENT", this.target);
    },
    getPerson(role) {
      let person = this.userList.find((user) => user.id === role);
      if (!person) {
        return "Пользователь удален";
      }
      if (!person.firstName || !person.secondName) {
        return `${person.login}`;
      }
      return `${person.firstName} ${person.secondName}`;
    },
  },
};
</script>
