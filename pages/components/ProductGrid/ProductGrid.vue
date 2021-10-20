<template>
  <div class="product-grid">
    <div class="start-grid">
      <SfProductCard
        v-for="(product, i) in products"
        data-cy="home-url_product"
        :title="product.title"
        :image="product.image"
        :regular-price="product.price.regular"
        :max-rating="product.rating.max"
        :score-rating="product.rating.score"
        :is-on-wishlist="product.isInWishlist"
        link="/"
        class="carousel__item__product"
      />
    </div>
  </div>
</template>

<script>
import { useProduct, productGetters } from "@vue-storefront/magento";
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
} from "@storefront-ui/vue";

export default {
  name: "ProductList",
  components: {
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
  },
  setup() {
    const { products, search, loading } = useProduct("products2323");
    search({ skus: ["WH01", "WH02"] });
    return { products, search, loading };
    console.log(products);
  },
  data() {
    return {
      products: [
        {
          title: "Cream Beach Bag",
          image: "/homepage/productA.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: true,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productB.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productC.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productA.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productB.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productC.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productA.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
        },
        {
          title: "Cream Beach Bag",
          image: "/homepage/productB.webp",
          price: { regular: "50.00 $" },
          rating: { max: 5, score: 4 },
          isInWishlist: false,
        },
      ],
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
