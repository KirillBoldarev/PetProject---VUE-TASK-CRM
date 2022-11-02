<template>
  <section id="confirmForm" class="form__container">
    <h2 class="form__title">Вы уверены ?</h2>
    <div class="form__row">
      <button @click="confirm" class="button--accept">Да</button>
      <button @click="close" class="button--decline">Нет</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ConfirmForm",
  data() {
    return {};
  },

  methods: {
    confirm() {
      this.$emit("confirm");
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
