<template>
  <q-page class="p-4 flex flex-col gap-4">
    <div v-if="isLoading" class="flex items-center justify-center h-screen w-full">
      <q-spinner color="primary" size="md" class="mb-4" />
    </div>

    <div
      v-else-if="favorites.length === 0"
      class="flex items-center justify-center h-screen w-full"
    >
      <img src="@/assets/no-data.jpg" class="object-contain max-w-full max-h-full" />
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      <ImageCard v-for="item in favorites" :key="item.id" :gif="item" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import type { ITrending } from '@/interfaces/Trending';
import { getFavoriteGifs } from '@/service/api';
import ImageCard from '@/components/ImageComponent/ImageCard.vue';

const favoritesStore = useFavoritesStore();
const favorites = ref<ITrending[]>([]);
const isLoading = ref(false);

onMounted(() => {
  favoritesStore.loadFavorites();
  void fetchFavoriteGifs();
});
const fetchFavoriteGifs = async () => {
  const ids = Array.from(favoritesStore.favorites);

  if (ids.length === 0) {
    favorites.value = [];
    return;
  }

  const idsParam = ids.join(',');

  try {
    isLoading.value = true;
    const data = await getFavoriteGifs(idsParam);
    favorites.value = data.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs favoritos:', error);
  } finally {
    isLoading.value = false;
  }
};
watch(
  () => Array.from(favoritesStore.favorites),
  (newFavs) => {
    favorites.value = favorites.value.filter((card: ITrending) => newFavs.includes(card.id));
  },
);
</script>
