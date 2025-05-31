import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'favoritos', component: () => import('pages/FavoritesPage.vue') },
      { path: 'categorias', component: () => import('pages/CategoriesPage.vue') },
      { path: 'sobre', component: () => import('pages/AboutPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
