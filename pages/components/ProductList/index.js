import React from 'react';
import ProductScroll from '../ProductScroll';
import { VueInReact } from 'vuera';
import ProductListVue from './ProductList.vue';

const ProductList = (props) => {
    const item = props;
    const Component = VueInReact(ProductListVue)
    const demo = React.createElement(Component)
    const title = React.createElement('h1', {}, 'My First React Code');
    const paragraph = React.createElement('p', {}, 'Writing some more HTML. Cool stuff!');
    return React.createElement('div', {}, [title, paragraph, demo]);
}
export default ProductList;