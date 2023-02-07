<script setup>
// import { useRouter } from "vue-router";
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import ShoppingCartModal from "@/components/modals/ShoppingCartModal";

// const router = useRouter();
const showShoppingCartDialog = ref(false);

onBeforeMount(() => {
  console.log("user header before mount");
});
onMounted(() => {
  console.log("user header mounted");
});
onBeforeUnmount(() => {
  console.log("user header before unmount");
});
</script>

<template>
  <!-- User header -->
  <div
    class="header-container row align-items-center justify-content-between m-auto"
  >
    <div class="col-4">
      <img src="@/assets/logo.png" class="commerce-logo" />
    </div>
    <div class="col-8 text-right">
      <div class="row align-items-center justify-content-netween">
        <div class="col">Ecommerce</div>
        <div
          class="col-auto div-as-btn"
          @click="showShoppingCartDialog = true"
          style="margin-right: 10px"
        >
          <span style="font-size: 30px"
            ><fa :icon="['fas', 'shopping-cart']"
          /></span>
        </div>
      </div>
    </div>
  </div>

  <!-- User Session Modal -->
  <ShoppingCartModal
    v-if="showShoppingCartDialog"
    @onshoppingcartmodalclose="showShoppingCartDialog = false"
  />
</template>
