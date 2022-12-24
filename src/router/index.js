import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404Page.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: () => import('@/views/TaskListPage.vue'),
    children: [
      {
        path: 'task/:id?',
        name: 'InspectedTask',
        component: () => import('@/views/TaskPage.vue'),
      },
    ],
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import('@/views/UserListPage.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfilePage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
