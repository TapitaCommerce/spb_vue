<template>
  <div class="product-grid">
    <div class="loader-absolute" v-if="!products">
      <div class="loader-productlist"></div>
    </div>
    <div class="start-grid">
      <SfProductCard
        v-for="(product, i) in products"
        :v-if="!!products"
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
            )}${productGetters.getSlug(product)}`
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
import { SfProductCard, SfLoader } from "@storefront-ui/vue";
import { computed, ref } from "@vue/composition-api";
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
    SfLoader,
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
    let sortData;
    let pageSize = 12;
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
      if (dataParsed.openProductsWidthSortPageSize) {
        pageSize = parseInt(dataParsed.openProductsWidthSortPageSize);
      }
      if (dataParsed.openProductsWidthSortAtt) {
        const directionToSort = dataParsed.openProductsWidthSortDir
          ? dataParsed.openProductsWidthSortDir.toUpperCase()
          : "ASC";
        sortData = {};
        sortData[dataParsed.openProductsWidthSortAtt] = directionToSort;
      }
    }
    const { products, search, loading } = useProduct(
      "pageBuilderProductGrid" + productString
    );
    search({
      filter: filterData,
      pageSize: pageSize,
      sort: sortData,
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
  min-width: 100%;
  .loader-absolute {
    .loader-productlist {
      border: 4px solid #f3f3f3;
      border-radius: 50%;
      border-top: 4px solid #5ece7b;
      width: 50px;
      height: 50px;
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 2s linear infinite;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    min-width: 100%;
    display: flex;
    justify-content: center;
    z-index: 10;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .start-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    @media only screen and (max-width: 576px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 0 20px;
      margin: 0;
    }
    @media only screen and (max-width: 768px) and (min-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 50px;
    }
    grid-auto-rows: max-content;
    grid-column-gap: 1.2rem;
    min-width: 100%;
    .carousel__item__product {
      min-width: 17rem;
    }
  }
}
</style>