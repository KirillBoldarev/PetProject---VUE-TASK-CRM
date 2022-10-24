<template>
  <img
    @click="deleteUser(this.target)"
    class="icon"
    src="@/icons/trash.png"
    alt=""
  />
</template>

<script>
export default {
  name: "DeleteUserButton",
  components: {},

  props: {
    target: {
      type: Object,
      required: true,
    },

    userList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    deleteUser(target) {
      let index;
      this.userList.forEach((user, idx) => {
        if (user.id === target.id) {
          index = idx;
        }
      });
      this.userList.splice(index, 1);
      this.$store.commit("updateUserList", this.userList);
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 34px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  text-decoration: none;
  cursor: pointer;

  &--mini {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
</style>
