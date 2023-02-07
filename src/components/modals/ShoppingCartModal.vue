<script setup>
import { defineEmits, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import ProdCartListItem from "@/components/list_items/ProdCartListItem";
import { useChoppingCart } from "@/composables/shopping_cart";

const emit = defineEmits(["ongotoshoppingcart", "onshoppingcartmodalclose"]);

const { getCartItems, cartItems, totalAmt } = useChoppingCart();

onBeforeMount(() => {
  console.log("shopping cart modal before mount");
});
onMounted(() => {
  console.log("shopping cart modal mounted");
  getCartItems();
});
onBeforeUnmount(() => {
  console.log("shopping cart modal before unmount");
});

function pay() {
  console.log("emit pay");
  emit("ongotoshoppingcart");
}
function closeModal() {
  console.log("shopping cart modal close");
  emit("onshoppingcartmodalclose");
}
</script>

<template>
  <div class="dialog-dismiss" @click="closeModal">
    <transition-group tag="div" name="resource-list" appear>
      <div
        key="resources"
        class="dialog-container shopping-cart-modal-container"
        @click.stop
      >
        <div class="row m-0 align-items-center justify-content-end">
          <div class="col">Productos en el carrito</div>
        </div>
        <div
          v-if="cartItems && cartItems.length"
          class="shopping-cart-modal-list"
        >
          <ProdCartListItem
            v-for="item in cartItems"
            :key="`product_cart_${item.prod.id}`"
            :item="item"
            @onprodcartlistitemplus="getCartItems"
            @onprodcartlistitemminus="getCartItems"
            @onprodcartlistitemdelete="getCartItems"
          />
        </div>
        <div v-else class="spinner mt-4">El carro está vacío</div>

        <div
          v-if="cartItems && cartItems.length"
          class="row m-0 align-items-center justify-content-end mt-4"
        >
          <div class="col-auto">
            <button class="std-btn std-btn-submit" @click="pay">
              <span
                ><fa :icon="['fas', 'money-bills']" /> &nbsp; Pagar $
                {{ totalAmt }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.shopping-cart-modal-container {
  min-width: 300px;
  max-width: 50%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 60px;
  right: 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
}

.shopping-cart-modal-list {
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
  overflow-x: hidden;
}

/* ---------------------------------------------------
    ANIMATIONS
----------------------------------------------------- */
.resource-list-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.resource-list-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.resource-list-enter-active {
  transition: all 0.5s ease;
}

.resource-list-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
.resource-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.resource-list-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.resource-list-move {
  transition: all 0.5s ease;
}
</style>
