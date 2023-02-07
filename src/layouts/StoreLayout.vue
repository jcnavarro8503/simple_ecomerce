<template>
  <!-- Store layout -->
  <div class="layout-store">
    <user-header />

    <router-view />
  </div>
</template>

<script>
import UserHeader from "../components/headers/UserHeader";

export default {
  components: {
    UserHeader,
  },
  setup() {
    return {};
  },
  computed: {
    // Sets layout's element's class based on route's meta data.
    layoutClass() {
      return this.$route.meta.layoutClass;
    },
  },
};
</script>
