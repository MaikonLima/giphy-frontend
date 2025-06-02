<template>
  <div class="q-gutter-sm row items-center no-wrap mr-5">
    <div v-if="showName" class="text-white font-semibold text-2xl">
      {{ user.name || 'Usuário' }}
    </div>
    <q-btn round flat>
      <q-avatar :size="`${size}px`">
        <img :src="user.avatar_url || defaultAvatar" class="bg-white" />
      </q-avatar>
      <q-tooltip>Conta GitHub</q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserInfoGit } from '@/service/ApiGit';

defineProps({
  showName: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 42,
  },
});

const username = 'MaikonLima';

const user = ref({
  name: '',
  avatar_url: '',
});

const defaultAvatar = new URL('@/assets/user.svg', import.meta.url).href;

async function fetchGithubUser() {
  try {
    const data = await getUserInfoGit(username);

    user.value = {
      name: data.name,
      avatar_url: data.avatar_url,
    };
  } catch (error) {
    console.error('Erro ao buscar dados do GitHub:', error);
  }
}

onMounted(async () => {
  await fetchGithubUser();
});
</script>
