<template>
  <q-page class="p-4 flex flex-col gap-4">
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <q-spinner color="primary" size="md" />
    </div>

    <div v-else>
      <div v-if="!selectedCategory">
        <div
          v-if="categories.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
        >
          <CategoryCard
            v-for="item in categories"
            :key="item.name_encoded"
            :category="item"
            @select-category="selectCategory"
          />
        </div>
        <div v-else class="text-center text-gray-500">Nenhuma categoria encontrada.</div>
      </div>

      <div v-else>
        <div class="mb-4">
          <q-btn flat icon="arrow_back" label="Retornar" @click="goBack" />
        </div>

        <div
          v-if="itensDados.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <CategoryCard v-for="dados in itensDados" :key="dados.name_encoded" :category="dados" />
        </div>
        <div v-else class="text-center text-gray-500">Nenhum GIF encontrado nesta categoria.</div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ICategories } from '@/interfaces/Categories';
import { getCategories, getSubCategories } from '@/service/api';
import CategoryCard from 'src/components/ImageComponent/CategoryCard.vue';

const isLoading = ref(false);
const categories = ref<ICategories[]>([]);
const selectedCategory = ref<string>('');
const itensDados = ref<ICategories[]>([]);
const titlePage = ref('Categorias');

onMounted(async () => {
  await loadCategories();
});

const loadCategories = async () => {
  isLoading.value = true;
  try {
    const response = await getCategories();
    categories.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  } finally {
    isLoading.value = false;
  }
};

const loadSubCategory = async (id: string) => {
  isLoading.value = true;
  try {
    const response = await getSubCategories(id);
    itensDados.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar GIFs:', error);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  selectedCategory.value = '';
};

const selectCategory = (nameCode: string) => {
  console.log('jdeiohduioe');

  selectedCategory.value = nameCode;
  titlePage.value = nameCode.charAt(0).toUpperCase() + nameCode.slice(1);
  void loadSubCategory(nameCode);
};
</script>
