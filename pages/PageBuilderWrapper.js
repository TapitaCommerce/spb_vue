import React, { Component, useEffect } from 'react'

import { PageBuilderComponent, usePbFinder } from 'simi-pagebuilder-react'
import Product from './Product.vue';
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import ProductScroll from './components/ProductScroll';

//const storeCode = STORE_VIEW_CODE;

const endPoint = 'https://tapita.io/pb/graphql/';
// const integrationToken = '14FJiubdB8n3Byig2IkpfM6OiS6RTO801622446444';
const integrationToken = '28YbkTlt7D1T6k6KnJfMHeCGKwgaTAt11632383932';


const PageBuilderWrapper = () => {
  //export default class Hello extends Component {
  //render() {

  const {
    loading: pbLoading,
    pageMaskedId,
    findPage,
    pathToFind,
    pageData
  } = usePbFinder({
    endPoint,
    integrationToken,
    getPageItems: true
  });

  useEffect(() => {
    if (
      location &&
      location.pathname &&
      location.pathname === '/'
    ) {
      if (!pageMaskedId || location.pathname !== pathToFind)
        findPage(location.pathname);
    }
  }, [location, pageMaskedId, pathToFind, findPage]);

  if (pageMaskedId) {
    return React.createElement(
      PageBuilderComponent,
      {
        endPoint: endPoint,
        maskedId: pageMaskedId,
        ProductList: ProductList
      }
    );
  } else if (pbLoading) {
    return React.createElement(
      "div",
      {
        className: "loading"
      },
      'Loading'
    );
  }
  return React.createElement(
    "div",
    {
      className: "loading"
    },
    'Loading'
  );
}
//}

export default PageBuilderWrapper;