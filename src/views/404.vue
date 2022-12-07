<template>
  <div class="flex-column center">
    <h2>ОШИБКА 404</h2>
    <h3>Страница не найдена!</h3>
    <div class="flex-row center">
      <img
        @click="this.$router.push('/')"
        v-tooltip.bottom="'Домой'"
        class="icon"
        src="@/assets/icons/home.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
};
</script>
