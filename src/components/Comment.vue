<template>
  <div class="comment__container flex-column">
    <div class="comment__top">
      <div class="comment__title">
        <strong
          >{{ target.dateOfCreation }} от {{ this.author.firstName }}
          {{ this.author.secondName }}</strong
        >
      </div>
      <img @click="deleteComment" class="icon" src="@/icons/remove.png" alt="" />
    </div>
    <div class="comment__body">{{ target.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    author() {
      return this.$store.getters.GET_USER_LIST.find(
        (user) => user.id === this.target.author
      );
    },
   },
   methods: {
      deleteComment() { 
         this.$store.commit('DELETE_COMMENT' , this.target)
      },
   },
};
</script>
