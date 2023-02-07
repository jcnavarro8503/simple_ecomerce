<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    // Sets components name based on current route's specified layout, defaults to
    // <layout-store></layout-store> component.
    layout() {
      return "layout-" + (this.$route.meta.layout || "store").toLowerCase();
    },
  },
};
</script>
