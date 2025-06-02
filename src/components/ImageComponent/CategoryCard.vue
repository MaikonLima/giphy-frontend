<template>
  <div
    class="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
    @click="handleClick"
  >
    <div
      v-if="loading"
      class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10"
    >
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <img
      :src="category.gif.images.downsized_medium.url"
      :alt="category.name"
      class="w-full h-full object-cover aspect-video"
      @load="onLoad"
      @error="onError"
    />

    <div
      class="absolute inset-0 flex items-center justify-center bg-opacity-0 hover:bg-opacity-50 transition duration-300"
    >
      <h3 class="text-white text-xl font-bold transition duration-300 text-center px-4">
        {{ category.name }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICategories } from '../../interfaces/Categories';
import { ref, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['select-category']);

const props = defineProps<{
  category: ICategories;
}>();

const loading = ref(true);

function onLoad() {
  loading.value = false;
}

function onError() {
  loading.value = false;
}

function handleClick() {
  emit('select-category', props.category.name_encoded);
}
</script>
