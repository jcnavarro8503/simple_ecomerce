<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import SearchBar from "@/components/search_bars/SearchBar";
import ProductCard from "@/components/card/ProductCard";
import { useProducts } from "@/composables/product";
import { useChoppingCart } from "@/composables/shopping_cart";

const { getProductList, filter, loading, productSearchResult } = useProducts();
const { addToCart } = useChoppingCart();

onBeforeMount(() => {
  console.log("products before mount");
});
onMounted(() => {
  console.log("products mounted");
  getProductList();
});
onBeforeUnmount(() => {
  console.log("products before unmount");
});

function addToShoppingCart(product) {
  addToCart(product);
}
</script>

<template>
  <div class="work-area-wraper">
    <div class="work-area-container">
      <div class="work-area-title"><h1>Store page</h1></div>
      <div class="work-area-header">
        <div class="row align-items-center justify-content-between">
          <div class="col-12 col-md-6">
            <search-bar
              :data="{
                placeholder: 'Buscar un producto',
                color: '#d1dbde',
                supressemitter: true,
              }"
              @onsearchbarchange="filter"
              @onsearchbarsearch="filter"
            />
          </div>
          <!-- <div class="col-auto"></div> -->
        </div>
      </div>
      <div class="work-area-content">
        <div v-if="loading" class="spinner mt-4">
          <pulse-loader :color="'#6C8293'"></pulse-loader>
        </div>

        <transition
          v-else
          name="product-list"
          class="row justify-content-around"
          appear
        >
          <div v-if="productSearchResult && productSearchResult.length">
            <ProductCard
              v-for="item in productSearchResult"
              :key="`products_card_${item.id}`"
              :product="item"
              @onproductcardaddtocart="addToShoppingCart"
            />
          </div>
          <div v-else class="spinner mt-4">No se encontraron resultados</div>
        </transition>
      </div>
    </div>
  </div>
</template>
