<template>
  <div class="flex items-center gap-2 bg-white rounded-xl px-4 py-2 w-full max-w-md">
    <q-input
      outlined
      dense
      v-model="search"
      placeholder="Buscar..."
      borderless
      class="flex-1"
      @keyup.enter="emitSearch"
      input-class="text-gray-700"
    >
      <template v-if="search" v-slot:append>
        <q-icon
          name="close"
          class="cursor-pointer text-gray-400 hover:text-red-500"
          @click="clearSearch"
        />
      </template>
    </q-input>
    <button
      class="bg-blue-600 text-blue-700 hover:bg-blue-500 px-3 py-1 rounded w-12 h-10 cursor-pointer"
      @click="emitSearch"
    >
      <img src="@/assets/search.svg" class="text-white" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const search = ref('');

const emit = defineEmits<{
  (e: 'search', value: string): void;
  (e: 'clearSearch'): void;
}>();

function emitSearch() {
  emit('search', search.value.trim());
}

function clearSearch() {
  search.value = '';
  emit('clearSearch');
}
</script>
