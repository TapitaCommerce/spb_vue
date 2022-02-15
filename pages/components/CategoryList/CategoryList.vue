<template>
  <div class="category-list" v-if="categories && categoryImage">
    <div v-for="category in categories" class="category-list-item">
      <SfLink
        :link="VUE.localePath(`/c/${category.url_path}${category.url_suffix}`)"
      >
        <SfImage
          :src="categoryImage"
          :alt="category.name"
          :width="200"
          :height="200"
        />
      </SfLink>
    </div>
  </div>
  <div class="categoryList-loader" v-else>
    <div class="loader-categorylist"></div>
  </div>
</template>

<script>
import { SfLink, SfImage } from "@storefront-ui/vue";
import { categoryGetters } from "@vue-storefront/magento";
import { customQueryCategoryTree } from "./customQueryCategoryTree.ts";
import { computed, ref } from "@nuxtjs/composition-api";
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
    console.log(item.dataParsed);
    const filterData = { ids: { eq: String(idToFind) } };
    const { query, result } = customQueryCategoryTree("categoryTree");
    query({
      variables: {
        filters: filterData,
      },
    });
    const categories = computed(() => {
      if (result.value.data && result.value.data.categoryList) {
        return result.value.data.categoryList[0].children;
      }
      return "";
    });
    return {
      categoryGetters,
      categories,
      categoryImage,
    };
  },
};
</script>

<style lang="scss">
.category-list {
  display: flex;
  overflow: hidden;
  min-width: 100%;
  justify-content: center;
  .category-list-item {
    margin: 10px;
  }
}
.categoryList-loader {
  .loader-categorylist {
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
