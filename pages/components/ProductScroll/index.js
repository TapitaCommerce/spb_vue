import React from 'react';
import { VueInReact } from 'vuera';
import ProductScrollVue from './ProductScroll.vue';
const ProductScroll = (props) => {
    const {
        item,
    } = props;
    const items = JSON.stringify(item);
    const Component = VueInReact(ProductScrollVue)

  return React.createElement(Component, { VUE: window.$nuxt, item: item });
}
export default ProductScroll;
