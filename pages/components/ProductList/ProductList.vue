<template>
  <div class="product-list" :class="uniqId">
    <div class="overall-scroll overall-scroll">
      <div class="loader-absolute" v-if="!products">
        <div class="loader-productlist"></div>
      </div>
      <div
        v-for="(product, i) in products"
        :key="i"
        class="carousel_item"
        :class="'product-count-'+i"
        id="carousel_item"
        ref="carousel_item"
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
      </div>
    </div>
    <div class="pb-action" v-if="products">
      <button
        link=""
        type="button"
        class="sf-arrow sf-button"
        v-on:click="slide('left', uniqId, products)"
      >
        <span class="sf-arrow__icon sf-icon" style="--icon-size: 1.5rem"
        ><svg
          viewBox="0 0 24 24"
          preserveAspectRatio="none"
          class="sf-icon-path"
        >
            <!---->
            <path
              d="M24 13L2 13L2 11L24 11L24 13Z"
              fill="var(--icon-color)"
              style="height: 100%"
            ></path>
            <path
              d="M6.61667 6L8 7.25423L2.76478 12L8 16.7458L6.61667 18L-5.24538e-07 12L6.61667 6Z"
              fill="var(--icon-color)"
              style="height: 100%"
            ></path></svg
        ></span>
      </button>

      <button
        link=""
        type="button"
        class="sf-arrow--right sf-arrow sf-button"
        v-on:click="slide('right', uniqId, products)"
      >
        <span
          class="sf-arrow--right sf-arrow__icon sf-icon"
          style="--icon-size: 1.5rem"
        ><svg
          viewBox="0 0 24 24"
          preserveAspectRatio="none"
          class="sf-icon-path"
        >
            <!---->
            <path
              d="M24 13L2 13L2 11L24 11L24 13Z"
              fill="var(--icon-color)"
              style="height: 100%"
            ></path>
            <path
              d="M6.61667 6L8 7.25423L2.76478 12L8 16.7458L6.61667 18L-5.24538e-07 12L6.61667 6Z"
              fill="var(--icon-color)"
              style="height: 100%"
            ></path></svg
        ></span>
      </button>
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
import {SfProductCard, SfArrow, SfCarousel} from "@storefront-ui/vue";
import {computed} from "@nuxtjs/composition-api";
import {useRouter} from '@nuxtjs/composition-api';
import {getRandomString} from '/helpers/tapita/getRandomString';
import {checkElementVisible} from '/helpers/tapita/checkElementVisible';

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
  methods: {
    getProductClassFromIndex(index) {
      return 'product-count-' + index
    },
    slide(direction, uniqId, products) {
      const container = document.querySelector(`.${uniqId} > .overall-scroll`);

      const productLength = products.length

      if (!container || productLength === 0) {
        return null
      }
      let firstVisibleProductIndex = null;
      let lastVisibleProductIndex = null;

      for (let i = 0; i < productLength; i++) {
        const targetClassProduct = this.getProductClassFromIndex(i)
        const target = container.querySelector(`.${targetClassProduct}`)

        if (checkElementVisible(target)) {
          if (firstVisibleProductIndex === null) {
            firstVisibleProductIndex = i;
          }
          lastVisibleProductIndex = i
        }
      }
      const scrollToTargetIndex = (direction === 'left') ?
        (((firstVisibleProductIndex ?? 0) - 1) % productLength)
        : (((lastVisibleProductIndex ?? 0) + 1) % productLength)

      const scrollToProductClass = this.getProductClassFromIndex(scrollToTargetIndex)
      const finalTargetToScrollTo = container.querySelector(`.${scrollToProductClass}`)

      if (finalTargetToScrollTo) {
        finalTargetToScrollTo.scrollIntoView({block: 'nearest', inline: 'start'});
      }
    },
  },
  setup(props, context) {
    const uniqId = getRandomString()
    const router = useRouter();
    const {isAuthenticated} = useUser();

    const {addItem: addItemToCartBase, isInCart} = useCart();
    const {
      addItem: addItemToWishlistBase,
      isInWishlist,
      removeItem: removeItemFromWishlist,
    } = useWishlist();
    const addItemToCart = async ({product, quantity}) => {
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
      await (isInWishlist({product})
        ? removeItemFromWishlist({product})
        : addItemToWishlistBase({product}));
    };
    let beginCategory = null;
    let productString;
    let sortData;
    let pageSize = 12;
    let filterData = {category_id: {eq: beginCategory}};
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
          category_id: {eq: String(dataParsed.openCategoryProducts)},
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
    const {products, search, loading} = useProduct(
      "pageBuilderProductList" + productString
    );
    search({
      filter: filterData,
      pageSize: pageSize,
      sort: sortData,
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
      uniqId
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
    scroll-behavior: smooth;
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

.pb-action {
  display: flex;
  width: 100%;
  justify-content: end;

  .sf-arrow--right {
    margin: 0px 10px;
  }
}
</style>
