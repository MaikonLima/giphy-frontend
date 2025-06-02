import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { Notify } from 'quasar';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: import.meta.env.VITE_URL_GIPHY });
const apiGit = axios.create({ baseURL: import.meta.env.VITE_URL_GIT });

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          Notify.create({
            type: 'negative',
            message: 'Requisição inválida. Verifique os dados.',
          });
          break;
        case 401:
          Notify.create({
            type: 'warning',
            message: 'Não autorizado. Faça login novamente.',
          });
          break;
        case 404:
          Notify.create({
            type: 'negative',
            message: 'Recurso não encontrado.',
          });
          break;
        case 500:
          Notify.create({
            type: 'negative',
            message: 'Erro interno do servidor. Tente novamente mais tarde.',
          });
          break;
        default:
          Notify.create({
            type: 'negative',
            message: 'Ocorreu um erro inesperado.',
          });
      }
    } else {
      Notify.create({
        type: 'negative',
        message: 'Erro de conexão. Verifique sua internet.',
      });
    }

    const err = error instanceof Error ? error : new Error(JSON.stringify(error));
    return Promise.reject(err);
  },
);

export { api, apiGit };
