<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-blue-80 text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" class="text-white" />

        <q-btn flat no-caps no-wrap class="q-ml-xs " v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold text-white">
            Giphy
          </q-toolbar-title>
        </q-btn>

        <q-space />
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <div class="text-white text-2xl">Maikon Guimaraes</div>
          <q-btn round flat>
            <q-avatar size="42px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2 p-4" :width="240">
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->
    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered class="text-white" :width="240">
      <!-- <q-list padding class="text-white">
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
      </q-list> -->
      <q-scroll-area class="fit bg-[#001f4d]">
        <q-list padding class="text-white">
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable class="q-mb-sm rounded hover:bg-blue-700"
            active-class="bg-blue-600">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-red">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { fabYoutube } from '@quasar/extras/fontawesome-v6'

export default {
  name: 'MyLayout',

  setup() {
    const leftDrawerOpen = ref(false)
    const search = ref('')

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      fabYoutube,

      leftDrawerOpen,
      search,

      toggleLeftDrawer,

      links1: [
        { text: 'Home', icon: 'home', to: '/' },
        { text: 'Favoritos', icon: 'favorite', to: '/favoritos' },
        { text: 'Categorias', icon: 'category', to: '/categorias' },
        { text: 'Sobre', icon: 'info', to: '/sobre' }
      ]
    }
  }
}
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>