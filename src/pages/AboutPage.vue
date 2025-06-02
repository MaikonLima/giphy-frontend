<template>
  <q-page class="p-4 flex flex-col gap-4">
    <div class="flex flex-col gap-2 items-center">
      <AvatarCard :showName="false" :size="100" />
      <div class="flex flex-col gap-2 items-center text-center max-w-xs mx-auto p-4">
        <div v-if="user">
          <h4 class="text-[#333] text-lg font-semibold mt-2">{{ user.name }}</h4>
          <span class="block underline text-[#333]">E-mail: andersonmaikon93@gmail.com</span>
          <span class="text-[#555] block mt-1">
            {{ user.bio }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <About :strings="strings" />

      <q-list bordered padding class="q-mt-sm q-ml-md" style="max-width: 400px">
        <q-item v-for="tech in technologies" :key="tech.name" clickable>
          <q-item-section>
            <q-item-label
              ><strong>{{ tech.name }}</strong></q-item-label
            >
            <q-item-label caption>{{ tech.description }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge color="primary" align="top">{{ tech.type }}</q-badge>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-card class="q-pa-md">
      <q-card-section>
        <q-scroll-area class="bg-white" style="height: 100px; max-width: 100%" horizontal>
          <div class="flex flex-row justify-between items-center q-gutter-md">
            <div v-for="stack in stacks" :key="stack.name" class="column items-center">
              <img :src="stack.icon" :alt="stack.name" width="50" height="50" />
              <div class="text-caption text-center q-mt-xs">
                {{ stack.name }}
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import AvatarCard from '@/components/ImageComponent/AvatarCard.vue';
import strings from '@/assets/strings/strings.json';

import { onMounted } from 'vue';
import { useGithubUserStore } from '@/stores/storeGithubUser';
import { stacks, technologies } from '@/utils/stacks';
import About from 'src/components/AboutComponent/About.vue';

const githubStore = useGithubUserStore();

onMounted(async () => {
  await githubStore.fetchUser('MaikonLima');
});

const user = githubStore.user;
</script>
