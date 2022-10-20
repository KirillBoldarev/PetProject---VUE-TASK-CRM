import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/tasks",
    name: "Task management",
    component: () => import("@/views/TaskList.vue"),
  },
  {
    path: "/users",
    name: "User list",
    component: () => import("@/views/UserList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
