<template>
  <q-header elevated class="bg-red-100-[!important] text-grey-8 q-py-xs" height-hint="58">
    <q-toolbar class="bg-[#0059E0]">
      <q-btn
        flat
        dense
        round
        @click="$emit('toggle-drawer')"
        aria-label="Menu"
        icon="menu"
        class="text-white"
      />

      <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
        <q-toolbar-title shrink class="text-weight-bold text-white"> GIPHY </q-toolbar-title>
      </q-btn>

      <q-space />
      <q-space />

      <AvatarCard />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import AvatarCard from '../ImageComponent/AvatarCard.vue';

defineEmits<{
  (e: 'toggle-drawer'): void;
}>();
</script>
