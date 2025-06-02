import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', component: () => import('pages/HomePage.vue'), meta: { title: 'Home' } },
      {
        path: 'favoritos',
        component: () => import('pages/FavoritesPage.vue'),
        meta: { title: 'Favoritos' },
      },
      {
        path: 'categorias',
        component: () => import('pages/CategoriesPage.vue'),
        meta: { title: 'Categorias' },
      },
      { path: 'sobre', component: () => import('pages/AboutPage.vue'), meta: { title: 'Sobre' } },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
