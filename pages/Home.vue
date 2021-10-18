<template>
  <div id="home">
    <my-react-component text="Hello React!" />
  </div>
</template>
<script type="module">
import { ReactInVue } from "vuera";
import MyReactComponent from "./PageBuilderWrapper.js";

import { useProduct, useCart, productGetters } from "@vue-storefront/magento";
import { computed, defineComponent } from "@vue/composition-api";
import { onSSR } from "@vue-storefront/core";
import LazyHydrate from "vue-lazy-hydration";
import MobileStoreBanner from "~/components/MobileStoreBanner.vue";
import InstagramFeed from "~/components/InstagramFeed.vue";
import ProductsCarousel from "~/components/ProductsCarousel.vue";
export default defineComponent({
  name: "Home",
  components: {
    "my-react-component": ReactInVue(MyReactComponent),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const {
      products: newProductsResult,
      search: newProductsSearch,
      loading: newProductsLoading,
    } = useProduct("newProducts");
    const { cart, load: loadCart, addItem: addToCart, isInCart } = useCart();
    // @ts-ignore
    const newProducts = computed(() =>
      productGetters.getFiltered(newProductsResult.value?.items, {
        master: true,
      })
    );
    onSSR(async () => {
      await newProductsSearch({
        pageSize: 10,
        currentPage: 1,
        sort: {
          position: "ASC",
        },
      });
      await loadCart();
    });
    return {
      newProducts,
      getChkId: computed(() => cart.value.id),
      newProductsLoading,
      productGetters,
      addToCart,
      isInCart,
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    toggleWishlist(index) {
      this.products[index].isInWishlist = !this.products[index].isInWishlist;
    },
  },
});
</script>
<style lang="scss">
#layout {
  max-width: inherit !important;
}
.sf-footer {
  margin-top: 0px !important;
}
</style>