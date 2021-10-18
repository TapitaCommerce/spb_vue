import React from 'react';
import { VueInReact } from 'vuera';
import {
    SfProductCard,
} from '@storefront-ui/vue';

const ProductScroll = (props) => {
    const Component = VueInReact(SfProductCard)
    return React.createElement(Component)
}
export default ProductScroll;