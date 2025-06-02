<template>
  <q-layout view="hHh LpR fFf" class="bg-grey-1">

    <Topbar @toggle-drawer="toggleLeftDrawer" />

    <Navbar v-model="leftDrawerOpen" />

    <q-page-container>
      <div class="m-6">
        <div class="text-[#0059E0] text-4xl font-bold mb-4">{{ $route.meta.title }}</div>
        <div class="bg-white rounded-xl shadow-md p-6 h-auto">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import Navbar from 'src/components/NavbarComponent/Navbar.vue';
import Topbar from 'src/components/TopbarComponent/Topbar.vue';
import { ref } from 'vue';

const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
