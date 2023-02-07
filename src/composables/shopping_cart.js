import { ref } from "vue";

export function useChoppingCart() {
  const loading = ref(true);
  const cartItems = ref([]);
  const totalAmt = ref(0);

  const getCartItems = async () => {
    loading.value = true;

    try {
      totalAmt.value = 0;
      cartItems.value = JSON.parse(localStorage.getItem("shopping_cart"));
      cartItems.value.forEach((item) => {
        totalAmt.value += item.qtty * item.prod.price;
      });
      loading.value = false;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  const addToCart = async (product) => {
    cartItems.value = JSON.parse(localStorage.getItem("shopping_cart"));

    loading.value = true;
    try {
      totalAmt.value = 0;
      var onCart = false;
      cartItems.value.forEach((item) => {
        if (item.prod.id == product.id) {
          item.qtty += 1;
          onCart = true;
        }

        totalAmt.value += item.qtty * item.prod.price;
      });

      if (!onCart) {
        cartItems.value.push({ prod: product, qtty: 1 });
      }

      localStorage.setItem("shopping_cart", JSON.stringify(cartItems.value));
      localStorage.setItem("total_amt", totalAmt.value);

      loading.value = false;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  const minusToCart = async (product) => {
    cartItems.value = JSON.parse(localStorage.getItem("shopping_cart"));

    loading.value = true;
    try {
      totalAmt.value = 0;
      var del = false;
      var i = -1;
      cartItems.value.forEach((item, index) => {
        if (item.prod.id == product.id) {
          if (item.qtty > 1) {
            item.qtty -= 1;

            totalAmt.value += item.qtty * item.prod.price;
          } else {
            del = true;
            i = index;
          }
        } else {
          totalAmt.value += item.qtty * item.prod.price;
        }
      });

      if (del) {
        cartItems.value.splice(i, 1);
      }

      localStorage.setItem("shopping_cart", JSON.stringify(cartItems.value));
      localStorage.setItem("total_amt", totalAmt.value);

      loading.value = false;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  const removeFromCart = async (product) => {
    cartItems.value = JSON.parse(localStorage.getItem("shopping_cart"));

    loading.value = true;
    try {
      totalAmt.value = 0;
      var found = false;
      var i = -1;
      cartItems.value.forEach((item, index) => {
        console.log(item.prod.id);
        if (item.prod.id == product.id) {
          found = true;
          i = index;
        } else {
          totalAmt.value += item.qtty * item.prod.price;
        }
      });

      if (found) {
        cartItems.value.splice(i, 1);
      }

      localStorage.setItem("shopping_cart", JSON.stringify(cartItems.value));
      localStorage.setItem("total_amt", totalAmt.value);

      loading.value = false;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  return {
    getCartItems,
    addToCart,
    minusToCart,
    removeFromCart,
    cartItems,
    totalAmt,
  };
}
