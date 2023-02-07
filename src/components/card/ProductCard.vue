<script setup>
import {
  defineProps,
  defineEmits,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
} from "vue";

const props = defineProps({
  product: {},
});

const emit = defineEmits(["onproductcardtap", "onproductcardaddtocart"]);

onBeforeMount(() => {
  console.log("product before mount");
});
onMounted(() => {
  console.log("product mounted");
});
onBeforeUnmount(() => {
  console.log("product before unmount");
});

function onTap() {
  emit("onproductcardtap", props.product);
}

function addToCart() {
  emit("onproductcardaddtocart", props.product);
}

console.log(props.product.id);
</script>

<template>
  <div class="product-card-container col-auto" @click.stop="onTap">
    <div class="product-card-inner row">
      <div class="title col-12">
        {{ product.title }}
      </div>
      <div class="col">
        <!-- image -->
        <img v-if="product.image" :src="product.image" class="image-view" />
        <img v-else src="@/assets/no_image.jpg" class="image-view" />

        <!-- category price -->
        <div class="category">
          {{ product.category }}
        </div>
        <div class="price">${{ product.price }}</div>
        <div>
          <button class="std-btn std-btn-submit" @click="addToCart">
            <span><fa :icon="['fas', 'shopping-cart']" /> &nbsp; Agregar</span>
          </button>
        </div>
      </div>
      <div class="d-none d-md-block col">
        <!-- description -->
        <div class="info-section">
          {{ product.description }}
        </div>
      </div>
    </div>
  </div>
</template>
