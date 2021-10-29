<template>
  <div v-if="category.data && category.data.categories" class="category__image">
    <SfLink
      :link="
        VUE.localePath(
          `/c/${category.data.categories.items[0].url_path}${category.data.categories.items[0].url_suffix}`
        )
      "
    >
      <SfImage
        :src="categoryImage"
        :alt="category.data.categories.items[0].name"
        :width="200"
        :height="200"
      />
    </SfLink>
  </div>
  <div class="category-loader" v-else>
    <div class="loader-category"></div>
  </div>
</template>

<script>
import { SfLink, SfImage } from "@storefront-ui/vue";
import { categoryGetters } from "@vue-storefront/magento";
import { customQuery } from "./customQuery.ts";
import { computed, ref } from "@vue/composition-api";
export default {
  name: "Category",
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
    SfLink,
    SfImage,
  },
  setup(props, context) {
    const item = props.item;
    const idToFind =
      item && item.dataParsed
        ? parseInt(item.dataParsed.openCategoryProducts)
        : null;
    const categoryImage =
      item && item.dataParsed ? item.dataParsed.image : null;
    const filterData = { ids: { eq: String(idToFind) } };
    const { query, result } = customQuery("category");
    query({
      variables: {
        filters: filterData,
      },
    });
    const category = computed(() => {
      return result.value;
    });
    return {
      categoryGetters,
      category,
      categoryImage,
    };
  },
};
</script>

<style lang="scss">
.category__image {
  display: flex;
  justify-content: center;
  background: #fff;
}
.category-loader {
  .loader-category {
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
</style>