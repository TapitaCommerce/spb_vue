import React from 'react';
import { VueInReact } from 'vuera';
import ProductListVue from './ProductList.vue';
const ProductList = (props) => {
    const {
        item,
        formatMessage,
        defaultPageSize = 12,
        beginCategory = null
    } = props;
    const items = JSON.stringify(item);
    const Component = VueInReact(ProductListVue)
    return React.createElement(Component, { VUE: window.$nuxt, item: item });
}
export default ProductList;