import React from 'react';
import { VueInReact } from 'vuera';
import CategoryListVue from './CategoryList.vue';
const CategoryList = (props) => {
    const {
        item,
    } = props;
    const Component = VueInReact(CategoryListVue)
    return React.createElement(Component, { VUE: window.$nuxt, item: item });
}
export default CategoryList;