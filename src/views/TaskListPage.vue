<template>
  <router-view />
  <task-list v-if="route.name === 'TaskList'" />
</template>

<script setup>
import TaskList from '@/components/tables/TaskList.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
</script>
