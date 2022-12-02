import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
  {
    path: "/tasks",
    name: "TaskList",
    component: () => import("@/views/TaskListPage.vue"),
    children: [
      {
        path: "task/:id?",
        name: "InspectedTask",
        component: () => import("@/views/TaskPage.vue"),
        beforeEnter: (to, from) => {
          store.dispatch("INITIALIZE_USER_LIST_ACTION");
          store.dispatch("INITIALIZE_TASK_LIST_ACTION");
          /* store.commit("INITIALIZE_INSPECTED_TASK");
                    if (store.getters.GET_USER_LIST.length < 1) {
            return { path: "/tasks" };
          } */
        },
      },
    ],
  },
  {
    path: "/users",
    name: "UserList",
    component: () => import("@/views/UserListPage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/ProfilePage.vue"),
  },
  /*   {
    path: "/task/:id",
    name: "InspectedTask",
    component: () => import("@/views/TaskPage.vue"),
    beforeEnter: (to, from) => {
      store.dispatch("INITIALIZE_USER_LIST_ACTION");
      store.dispatch("INITIALIZE_TASK_LIST_ACTION");
      if (store.getters.GET_USER_LIST.length < 1) {
        return { path: "/tasks" };
      }
    },
  }, */
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
