<template>
    <q-drawer show-if-above side="left" bordered class="bg-[#001f4d] text-white">
        <q-list padding class="text-white">
            <q-item-label header class="text-lg text-center mt-4 mb-6 font-bold">SGAW</q-item-label>

            <q-item v-for="link in links" :key="link.label" :to="link.to" clickable v-ripple
                class="q-mb-sm rounded hover:bg-blue-700" active-class="bg-blue-600">
                <q-item-section avatar>
                    <q-icon :name="link.icon" />
                </q-item-section>
                <q-item-section>
                    <span class="text-sm">{{ link.label }}</span>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>

<script setup lang="ts">
const links = [
    { label: 'Home', icon: 'home', to: '/' },
    { label: 'Favoritos', icon: 'favorite', to: '/favoritos' },
    { label: 'Categorias', icon: 'category', to: '/categorias' },
    { label: 'Sobre', icon: 'info', to: '/sobre' }
]
</script>

<style scoped>
.q-item {
    transition: background-color 0.2s;
}
</style>
