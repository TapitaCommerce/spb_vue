<template>
  <div id="home">
    <my-react-component text="Hello React!" />
  </div>
</template>
<script type="module">
import { ReactInVue } from "vuera";
import MyReactComponent from "./PageBuilderWrapper.js";

import {
  useProduct,
  useCart,
  productGetters,
  categoryGetters,
} from "@vue-storefront/magento";
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
    const { products, search, loading } = useProduct("products2323");
    search({ skus: ["WH01", "WH02"] });
    return {
      products,
      productGetters,
    };
    console.log(products);
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