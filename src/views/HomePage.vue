<template>
  <div class="page">
    <h2 class="page__title">Приветствую на главной странице!</h2>
    <div class="page__body">
      <registration-form v-if="!this.$store.getters.checkForAuthenticate"
      :userList="userList"></registration-form>
    </div>
  </div>

</template>

<script>
import RegistrationForm from "@/components/forms/RegistrationForm.vue"
export default {
  props: {
    userList: {
      type: Array,
      required:true,
    }
  },
  components: {
    RegistrationForm
  },
  date() { 
    return {}
  }
}

</script>