import React from 'react';
import { VueInReact } from 'vuera';
import CategoryVue from './Category.vue';
const Category = (props) => {
    const {
        item,
    } = props;
    const Component = VueInReact(CategoryVue)
    return React.createElement(Component, { VUE: window.$nuxt, item: item });
}
export default Category;
