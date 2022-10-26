<template>
  <div class="tab__navigation">
    <span
      v-for="tab in tabs"
      :key="tab.name"
      class="tab__navigation-item"
      :class="{ selected: tab.name === selectedTab }"
      @click="this.changeTab(tab.name)"
      >{{ tab.label }}</span
    >
  </div>
  <div class="tab__content">
   <slot></slot>
  </div>
</template>

<script>
export default {
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

  methods: {
    changeTab(tabName) {
      this.$emit("changeTab", tabName);
    },
  },
};
</script>

<style lang="scss" scoped>
.selected {
  color: red;
  text-decoration: underline;
}


.tab{

   &__navigation{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 30px;
   }

   &__navigation-item{
      padding: 5px;
   }
}
</style>
