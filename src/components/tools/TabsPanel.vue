<template>
  <div class="tab__navigation">
    <span
      v-for="tab in props.tabs"
      :key="tab.name"
      class="tab__navigation-item"
      :class="{ tab__selected: tab.name === selectedTab }"
      @click="changeTab(tab.name)"
      >{{ tab.label }}</span
    >
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  selectedTab: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['changeTab']);

function changeTab(tabName) {
  emit('changeTab', tabName);
}
</script>
