<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden relative">
    <button @click="toggleFavorite(gif.id)" class="absolute top-2 right-2 z-20">
      <q-icon
        :name="isFavorite(gif.id) ? 'favorite' : 'favorite_border'"
        size="24px"
        :color="isFavorite(gif.id) ? 'red' : 'white'"
        class="drop-shadow-md cursor-pointer"
      />
    </button>

    <div class="relative w-full aspect-video">
      <div
        v-if="loading"
        class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10"
      >
        <q-spinner-dots color="primary" size="40px" />
      </div>

      <img
        :src="gif.images.original.url"
        :alt="gif.title"
        class="w-full h-full object-cover"
        @load="onLoad"
        @error="onError"
      />

      <div
        class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
      >
        <h3 class="text-white text-center text-lg font-bold drop-shadow-md px-2">
          {{ gif.title || 'Sem título' }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from 'src/stores/useFavoritesStore';
import type { ITrending } from '../../interfaces/Trending';
import { ref } from 'vue';

defineProps<{
  gif: ITrending;
}>();

const loading = ref(true);
const favoritesStore = useFavoritesStore();

function onLoad() {
  loading.value = false;
}

function onError() {
  loading.value = false;
}

const toggleFavorite = (id: string) => {
  favoritesStore.toggleFavorite(id);
};

const isFavorite = (id: string) => {
  return favoritesStore.isFavorite(id);
};
</script>
