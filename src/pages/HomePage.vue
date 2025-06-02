<template>
  <q-page class="p-4 flex flex-col gap-4">
    <div class="flex lg:flex-row flex-col-reverse justify-between items-center gap-6 mb-6">
      <span class="text-3xl font-bold text-[#0059E0]">Trending</span>
      <Search @search="searchGifs" @clearSearch="clearSearch" />
    </div>
    <div v-if="isLoading" class="flex items-center justify-center h-100 w-full">
      <q-spinner color="primary" size="md" class="mb-4" />
    </div>
    <div v-if="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <p v-if="cards.length === 0" class="text-center text-gray-500">Nenhum GIF encontrado</p>
      <ImageCard v-for="item in cards" :key="item.id" :gif="item" />
    </div>

    <div v-if="canLoadMore" class="flex justify-center mt-4">
      <q-btn label="Carregas mais GIFs" color="primary" @click="loadMoreGifs" />
    </div>

    <div v-if="isLoadingMore" class="flex justify-center mt-4">
      <q-spinner color="primary" size="md" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import Search from '@/components/SearchComponent/Search.vue';
import type { ITrending } from '@/interfaces/Trending';
import { getTrending, searchTerms } from '@/service/api';
import ImageCard from '@/components/ImageComponent/ImageCard.vue';

const favoritesStore = useFavoritesStore();

const cards = ref<ITrending[]>([]);
const searchTerm = ref('');
const initialCards = ref<ITrending[]>([]);
const isLoading = ref(false);
const isLoadingMore = ref(false);
const limit = ref<number>(250);
const pageIndex = ref<number>(0);
const totalCount = ref<number>(0);

const loadInitialData = async () => {
  favoritesStore.loadFavorites();
  await fetchTrending(limit.value, pageIndex.value);
};

const fetchTrending = async (itemsPerPage: number, currentPage: number) => {
  isLoading.value = true;
  try {
    const response = await getTrending(itemsPerPage, currentPage);

    totalCount.value = response.pagination.total_count;

    if (currentPage === 0) {
      cards.value = response.data;
      initialCards.value = response.data;
    } else {
      cards.value.push(...response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar GIFs em alta:', error);
  } finally {
    isLoading.value = false;
  }
};

const updateFavorites = () => {
  cards.value = cards.value.map((card: ITrending) => ({
    ...card,
    isFavorite: favoritesStore.isFavorite(card.id),
  }));
};

const searchGifs = async (term: string) => {
  searchTerm.value = term;
  pageIndex.value = 0;

  if (!term) {
    cards.value = initialCards.value;
    return;
  }

  isLoading.value = true;
  try {
    const response = await searchTerms(searchTerm.value, limit.value, pageIndex.value);
    cards.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs:', error);
  } finally {
    isLoading.value = false;
  }
};

const clearSearch = () => {
  searchTerm.value = '';
  cards.value = initialCards.value;
  isLoading.value = false;
};

const loadMoreGifs = async () => {
  const isBusy = isLoadingMore.value || isLoading.value || searchTerm.value;
  const reachedEnd = pageIndex.value + 1 >= Math.ceil(totalCount.value / limit.value);

  if (isBusy || reachedEnd) return;

  isLoadingMore.value = true;

  try {
    const nextPage = ++pageIndex.value;
    const { data } = await getTrending(limit.value, nextPage);
    cards.value.push(...data);
  } catch (err) {
    console.error('Erro ao carregar mais GIFs:', err);
  } finally {
    isLoadingMore.value = false;
  }
};

const canLoadMore = computed(() => {
  const totalPages = Math.ceil(totalCount.value / limit.value);
  return (
    !isLoading.value &&
    !searchTerm.value &&
    cards.value.length > 0 &&
    pageIndex.value + 1 < totalPages
  );
});

onMounted(async () => {
  await loadInitialData();
});

watch(
  () => favoritesStore.favorites,
  () => updateFavorites(),
);
</script>
