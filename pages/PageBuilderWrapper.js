import React, { Component, useEffect } from 'react'

import { PageBuilderComponent, usePbFinder } from 'simi-pagebuilder-react'
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import Category from './components/Category';
import CategoryList from './components/CategoryList';
import { endPoint, integrationToken, storeCode } from './PageBuilderConfig.js';
import './style.scss';


const PageBuilderWrapper = () => {

  const {
    loading: pbLoading,
    pageMaskedId,
    findPage,
    pathToFind,
    pageData
  } = usePbFinder({
    endPoint,
    integrationToken,
    storeCode,
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
        ProductList: ProductList,
        ProductGrid: ProductGrid,
        Category: Category,
        CategoryScroll: CategoryList
      }
    );
  } else if (pbLoading) {
    return React.createElement(
      'div',
      {
        className: "pb-background"
      },
      [
          React.createElement('div', {className: "loader"}),     
          React.createElement('img', {className: "splash-img", src:"/pb/1556608.jpeg"})        
      ]
    );
  }
  return React.createElement(
    'div',
    {
      className: "pb-background"
    },
    [
        React.createElement('div', {className: "loader"}),     
        React.createElement('img', {className: "splash-img", src:"/pb/1556608.jpeg"})        
    ]
  );
}
//}

export default PageBuilderWrapper;