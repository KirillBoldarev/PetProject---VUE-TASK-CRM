<template>
  <div class="page">
    <h2 class="page__title">Приветствую на главной странице!</h2>
    <div class="page__body">
      <button @click="info">Store</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  components: {},
  date() {
    return {};
  },

  methods: {
    info() {
      console.log(this.$store);
    },
  },
};
</script>
