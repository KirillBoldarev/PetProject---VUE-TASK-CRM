<template>
  <tab
    :tabs="pages"
    :selectedTab="selectedTab"
    @changeTab="this.changeTab"
  >
  </tab>
  <div v-if="selectedTab === 'Страница 1'">СОДЕРЖИМОЕ СТРАНИЦЫ 1</div>
  <div v-if="selectedTab === 'Страница 2'">СОДЕРЖИМОЕ СТРАНИЦЫ 2</div>
  <div v-if="selectedTab === 'Страница 3'">СОДЕРЖИМОЕ СТРАНИЦЫ 3</div>
</template>

<script>
import Tab from "@/components/Tabs.vue";
export default {
  components: {
    Tab,
  },

  data() {
    return {
      pages: [
        { name: "Страница 1", label: "Лейбл страницы 1" },
        { name: "Страница 2", label: "Лейбл страницы 2" },
        { name: "Страница 3", label: "Лейбл страницы 3" },
      ],
      selectedTab: "",
    };
  },

  methods: {
    changeTab(tabName) {
      this.selectedTab = tabName;
    },
  },
};
</script>
