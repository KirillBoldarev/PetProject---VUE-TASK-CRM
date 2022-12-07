<template>
  <header-layout
    class="main__header"
    :taskList="tasksStore.GET_TASK_LIST"
    :userList="usersStore.GET_USER_LIST"
  ></header-layout>
  <main class="main__content">
    <router-view :taskList="tasksStore.GET_TASK_LIST" :userList="usersStore.GET_USER_LIST"></router-view>
  </main>
  <footer-layout
    :taskList="tasksStore.GET_TASK_LIST"
    :userList="usersStore.GET_USER_LIST"
    class="main__footer"
  ></footer-layout>
</template>

<script>
import HeaderLayout from './components/layouts/HeaderLayout.vue'
import FooterLayout from './components/layouts/FooterLayout.vue'
import { useUsersStore } from './stores/UsersStore'
import { useCommentsStore } from './stores/CommentsStore'
import { useAuthenticatedStore } from './stores/AuthenticatedStore'
import { useInspectedTaskStore } from './stores/InspectedTaskStore'
import { useTasksStore } from './stores/TasksStore'
import { useScreenResolutionStore } from './stores/ScreenResolution'

import { mapStores } from 'pinia'

export default {
  components: { HeaderLayout, FooterLayout },
  data () {
    return {
    }
  },
  methods: {
    info () {
      console.log('this.usersStore', this.usersStore)
    }
  },

  computed: {
    ...mapStores(
      useUsersStore,
      useAuthenticatedStore,
      useTasksStore,
      useInspectedTaskStore,
      useScreenResolutionStore,
      useCommentsStore
    )
  },

  created () {
    const mediaQuery = window.matchMedia('(min-width: 810px)')
    if (mediaQuery.matches) {
      this.screenResolutionStore.SET_DESKTOP()
    } else {
      this.screenResolutionStore.SET_MOBILE()
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth > 810) {
        this.screenResolutionStore.SET_DESKTOP()
      } else {
        this.screenResolutionStore.SET_MOBILE()
      }
    })
  },

  mounted () {
    this.usersStore.INITIALIZE_USER_LIST()
    this.authenticatedStore.INITIALIZE_AUTHENTICATED()
    this.tasksStore.INITIALIZE_TASK_LIST()
  }
}
</script>
