<template>
  <img
    @click="deleteUser"
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
  },

  data() {
    return {};
  },

  methods: {
    deleteUser() {
      this.$store.commit("deleteUser", this.target);
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
