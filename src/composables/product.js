import { ref } from "vue";

export function useProducts() {
  const loading = ref(true);
  const products = ref(null);
  const productSearchResult = ref([]);
  const error = ref(null);
  const url = process.env.VUE_APP_API_BASE_URL + "products";

  const getProductList = async () => {
    try {
      // options
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      };
      // fetch signin
      fetch(url, requestOptions).then(async (response) => {
        products.value = await response.json();
        productSearchResult.value = products.value.filter((item) => item);
        loading.value = false;

        if (response.status != 200) {
          error.value = "Ha ocurrido un error";
        }
      });
    } catch (error) {
      console.log(error);
      // error.value = error;
    }
  };

  const filter = async (criteria) => {
    if (criteria) {
      var needle = criteria.toLowerCase();
      productSearchResult.value = products.value.filter(
        (item) =>
          item.description.toLowerCase().includes(needle) ||
          item.category.toLowerCase().includes(needle)
      );
    } else {
      productSearchResult.value = products.value.filter((item) => item);
    }
  };

  return {
    getProductList,
    filter,
    loading,
    productSearchResult,
  };
}
