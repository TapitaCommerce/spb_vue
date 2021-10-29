<template>
  <div class="product-list">
    <div class="overall-scroll">
      <div class="loader-absolute" v-if="!products">
        <div class="loader-productlist"></div>
      </div>
      <SfCarousel
        data-cy="related-products-carousel"
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
        class="carousel"
      >
        <SfCarouselItem
          v-for="(product, i) in products"
          :key="i"
          class="carousel__item"
        >
          <SfProductCard
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
        </SfCarouselItem>
      </SfCarousel>
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
import { SfProductCard, SfArrow, SfCarousel } from "@storefront-ui/vue";
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
    SfArrow,
    SfCarousel,
  },
  setup(props, context) {
    const { router } = useVueRouter();
    const { isAuthenticated } = useUser();
    let maxSteps = 1;
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
    if (props.item && props.item.dataParsed) {
      productString = Math.random();
      const dataParsed = props.item.dataParsed;
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
    }
    const { products, search, loading } = useProduct(
      "pageBuilderProductList" + productString
    );
    search({
      filter: filterData,
    });
    const productFinal = computed(() => {
      return products.value.items;
    });
    return {
      products: productFinal,
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

<style lang="scss">
.product-list {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  min-width: 100%;
  .arrow-product-list {
    display: flex;
    width: 100%;
    justify-content: right;
  }
  .loader-absolute {
    .loader-productlist {
      border: 10px solid #f3f3f3;
      border-radius: 50%;
      border-top: 10px solid #5ece7b;
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
  }

  /* Safari */
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

  .overall-scroll {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    overflow: auto;
    margin-bottom: 30px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .carousel__item__product {
      min-width: 16rem;
      margin-right: 20px;
      .spb-item h3 {
        margin-top: 20px !important;
      }
    }
  }
}
.sf-product-card__title {
  margin-top: 20px !important;
  font-size: 16px !important;
}
.glide {
  max-width: 18rem;
}
.sf-carousel__wrapper {
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
