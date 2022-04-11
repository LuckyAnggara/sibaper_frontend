<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  computed: {
    layout() {
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return 'layout-normal'
    },
  },
}
</script>
