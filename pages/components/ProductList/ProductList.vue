<template>
  <div class="root product-list">
    <div class="overall-scroll"></div>
  </div>
</template>

<script>
import { useProduct, productGetters } from "@vue-storefront/magento";
import { onSSR } from "@vue-storefront/core";

export default {
  setup() {
    const { products, search: searchProduct, loading } = useProduct();
    onSSR(async () => {
      await searchProduct({ catId: "2" });
    });
    console.log(products);
  },
};
</script>

<style>
</style>
