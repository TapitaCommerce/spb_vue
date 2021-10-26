<template>
  <h1 :v-if="category.data">
    {{ JSON.stringify(category.data) }}
  </h1>
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
    const filterData = { category_id: "8" };
    const { query, result } = customQuery("hello");
    query({
      variables: {
        filters: {
          ids: { eq: "3" },
        },
      },
    });
    const category = computed(() => {
      return result.value;
    });
    return {
      categoryGetters,
      category,
    };
  },
};
</script>

<style>
</style>