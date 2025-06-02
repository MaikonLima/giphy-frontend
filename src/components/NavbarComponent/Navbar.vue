<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    side="left"
    bordered
    class="bg-[#001f4d] text-white"
    :width="240"
  >
    <q-list class="mt-6 p-4">
      <q-item
        v-for="link in links"
        :key="link.text"
        v-ripple
        clickable
        :to="link.to"
        class="q-mb-sm rounded hover:bg-blue-700"
        :active="isActive(link.to)"
        active-class="bg-blue-600"
        style="border-radius: 16px"
      >
        <q-item-section avatar>
          <q-icon :color="isActive(link.to) ? 'white' : 'grey'" :name="link.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white font-semibold">
            {{ link.text }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const leftDrawerOpen = ref(props.modelValue);
const route = useRoute();

watch(
  () => props.modelValue,
  (val) => {
    leftDrawerOpen.value = val;
  },
);

watch(leftDrawerOpen, (val) => {
  emit('update:modelValue', val);
});

const links = [
  { text: 'Home', icon: 'home', to: '/home' },
  { text: 'Favoritos', icon: 'favorite', to: '/favoritos' },
  { text: 'Categorias', icon: 'category', to: '/categorias' },
  { text: 'Sobre', icon: 'info', to: '/sobre' },
];

const isActive = (path: string) => route.path === path;
</script>
