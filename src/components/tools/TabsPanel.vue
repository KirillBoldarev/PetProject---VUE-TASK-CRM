<template>
  <div class="tab__navigation">
    <span
      v-for="tab in tabs"
      :key="tab.name"
      class="tab__navigation-item"
      :class="{ tab__selected: tab.name === selectedTab }"
      @click="changeTab(tab.name)"
      >{{ tab.label }}</span
    >
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selectedTab: {
      type: String,
      required: false,
    },
  },
  emits: ['changeTab'],
  methods: {
    changeTab(tabName) {
      this.$emit('changeTab', tabName);
    },
  },
};
</script>
