<template>
  <div>
    <span class="text-base text-gray-700 leading-relaxed">
      {{ strings.about.description }}
    </span>

    <h4 class="mt-4">{{ strings.header.title }}</h4>
    <p class="text-base text-gray-700 leading-relaxed">
      {{ strings.header.body }}
    </p>

    <h4 class="mt-4">{{ strings.header.subtTitle }}</h4>
    <p class="text-base text-gray-700 leading-relaxed">
      {{ strings.header.subBody }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  strings: {
    type: Object,
    required: true,
  },
});
</script>
