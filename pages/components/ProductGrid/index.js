import React from 'react';
import { VueInReact } from 'vuera';
import ProductGridVue from './ProductGrid.vue';
const ProductList = (props) => {
    const item = props;
    const Component = VueInReact(ProductGridVue)
    return React.createElement(Component, { VUE: window.$nuxt, item: item });
}
export default ProductList;