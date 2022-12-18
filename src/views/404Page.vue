<template>
  <div class="flex-column center">
    <h2>ОШИБКА 404</h2>
    <h3>Страница не найдена!</h3>
    <div class="flex-row center">
      <img
        v-tooltip.bottom="'Домой'"
        class="icon"
        src="@/assets/icons/home.png"
        alt=""
        @click="router.push('/')"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
