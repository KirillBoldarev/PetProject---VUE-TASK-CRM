import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
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
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/task",
    name: "Task",
    component: () => import("@/views/TaskPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
