<template>
  <div class="product-grid">
    <div class="start-grid">
      <SfProductCard
        v-for="(product, i) in products"
        :key="productGetters.getSlug(product)"
        v-e2e="'category-product-card'"
        class="carousel__item__product"
        :style="{ '--index': i }"
        :title="productGetters.getName(product)"
        :image="productGetters.getProductThumbnailImage(product)"
        :regular-price="
          VUE.$n(productGetters.getPrice(product).regular, 'currency')
        "
        :special-price="
          productGetters.getPrice(product).special &&
          VUE.$n(productGetters.getPrice(product).special, 'currency')
        "
        :score-rating="productGetters.getAverageRating(product)"
        :reviews-count="productGetters.getTotalReviews(product)"
        :show-add-to-cart-button="true"
        :is-added-to-cart="isInCart({ product })"
        :is-on-wishlist="product.isInWishlist"
        :wishlist-icon="isAuthenticated ? 'heart' : false"
        :link="
          VUE.localePath(
            `/p/${productGetters.getProductSku(
              product
            )}${productGetters.getSlug(product, product.categories[0])}`
          )
        "
        @click:wishlist="addItemToWishlist(product)"
        @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
      />
    </div>
  </div>
</template>

<script>
import {
  useCart,
  useWishlist,
  useProduct,
  useUser,
  productGetters,
} from "@vue-storefront/magento";
import { SfProductCard } from "@storefront-ui/vue";
import { computed } from "@vue/composition-api";
import { useVueRouter } from "~/helpers/hooks/useVueRouter";

export default {
  name: "ProductList",
  props: {
    VUE: {
      required: true,
      type: Object,
    },
    item: {
      required: true,
      type: Object,
    },
  },
  components: {
    SfProductCard,
  },
  setup(props, context) {
    const { router } = useVueRouter();
    const { isAuthenticated } = useUser();

    const { addItem: addItemToCartBase, isInCart } = useCart();
    const {
      addItem: addItemToWishlistBase,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const addItemToCart = async ({ product, quantity }) => {
      // eslint-disable-next-line no-underscore-dangle
      const productType = product.__typename;
      switch (productType) {
        case "SimpleProduct":
          await addItemToCartBase({
            product,
            quantity,
          });
          break;
        case "BundleProduct":
        case "ConfigurableProduct":
          await router.push(
            `/p/${productGetters.getProductSku(
              product
            )}${productGetters.getSlug(product, product.categories[0])}`
          );
          break;
        default:
          throw new Error(
            `Product Type ${productType} not supported in add to cart yet`
          );
      }
    };
    const addItemToWishlist = async (product) => {
      await (isInWishlist({ product })
        ? removeItemFromWishlist({ product })
        : addItemToWishlistBase({ product }));
    };
    let beginCategory = null;
    let productString;
    let filterData = { category_id: { eq: beginCategory } };
    if (props.item && props.item.data) {
      productString = Math.random();
      const dataParsed = props.item.data;
      if (dataParsed.openProductsWidthSKUs) {
        let openProductsWidthSKUs = dataParsed.openProductsWidthSKUs;
        openProductsWidthSKUs = openProductsWidthSKUs.trim();
        openProductsWidthSKUs = openProductsWidthSKUs.split(",");
        filterData = {
          sku: {
            in: openProductsWidthSKUs,
          },
        };
      } else if (dataParsed.openCategoryProducts) {
        filterData = {
          category_id: { eq: String(dataParsed.openCategoryProducts) },
        };
      }
      console.log(dataParsed);
    }
    console.log(props.item);
    console.log(filterData);
    const { products, search, loading } = useProduct(
      "pageBuilderProductGrid" + productString
    );
    search({
      filter: filterData,
    });
    const newProducts = computed(() =>
      productGetters.getFiltered(products.value?.items, { master: true })
    );
    return {
      products: newProducts,
      productGetters,
      isInCart,
      addItemToCart,
      isInWishlist,
      addItemToWishlist,
      isAuthenticated,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-grid {
  margin: 0 30px;
  .start-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: max-content;
    grid-column-gap: 1.2rem;

    .carousel__item__product {
      min-width: 17rem;
    }
  }
}
</style>
