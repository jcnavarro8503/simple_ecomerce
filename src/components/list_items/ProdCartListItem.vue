<script setup>
import {
  defineProps,
  defineEmits,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useChoppingCart } from "@/composables/shopping_cart";

const { addToCart, minusToCart, removeFromCart } = useChoppingCart();

const props = defineProps({
  item: {},
});

const emit = defineEmits([
  "onprodcartlistitemplus",
  "onprodcartlistitemminus",
  "onprodcartlistitemdelete",
]);

onBeforeMount(() => {
  console.log("prod cart list item before mount");
});
onMounted(() => {
  console.log("prod cart list item mounted");
});
onBeforeUnmount(() => {
  console.log("prod cart list item before unmount");
});

function plusProd() {
  addToCart(props.item.prod);
  emit("onprodcartlistitemplus");
}
function minusProd() {
  minusToCart(props.item.prod);
  emit("onprodcartlistitemminus");
}
function removeProd() {
  removeFromCart(props.item.prod);
  emit("onprodcartlistitemdelete");
}
</script>

<template>
  <div class="prod-cart-list-item-container">
    <div class="prod-cart-list-item-inner">
      <div class="row m-0 align-items-center justify-content-between">
        <div class="col-auto">
          <!-- image -->
          <img
            v-if="item.prod.image"
            :src="item.prod.image"
            class="image-view"
          />
          <img v-else src="@/assets/no_image.jpg" class="image-view" />
        </div>
        <div class="col">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="title m-1">{{ item.prod.title }}</div>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="row m-0">
            <button class="col std-btn std-btn-submit" @click="plusProd">
              <span><fa :icon="['fas', 'plus']" /></span>
            </button>
            <button class="col std-btn std-btn-cancel" @click="minusProd">
              <span><fa :icon="['fas', 'minus']" /></span>
            </button>
            <button class="col std-btn std-btn-delete" @click="removeProd">
              <span><fa :icon="['fas', 'trash']" /></span>
            </button>
          </div>
        </div>
      </div>
      <div class="row align-items-center price-qtty m-1">
        <div class="col-6">{{ item.qtty }} x ${{ item.prod.price }}</div>
        <div class="col-6">sub: ${{ item.qtty * item.prod.price }}</div>
      </div>
    </div>
  </div>
</template>
