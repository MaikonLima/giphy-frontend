import { defineStore } from 'pinia';
import type { IGithubUser } from 'src/interfaces/GithubUser';
import { getUserInfoGit } from 'src/service/ApiGit';
import { ref } from 'vue';

export const useGithubUserStore = defineStore('githubUser', () => {
  const user = ref<IGithubUser | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchUser(username: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await getUserInfoGit(username);
      user.value = response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = String(err);
      }
    } finally {
      loading.value = false;
    }
  }

  function clearUser() {
    user.value = null;
    error.value = null;
  }

  return {
    user,
    loading,
    error,
    fetchUser,
    clearUser,
  };
});
