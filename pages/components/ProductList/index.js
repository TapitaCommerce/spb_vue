import React from 'react';
import { VueInReact } from 'vuera';
import ProductListVue from './ProductList.vue';
const ProductList = (props) => {
    const item = props;
    const Component = VueInReact(ProductListVue)
    return React.createElement(Component, {});
}
export default ProductList;