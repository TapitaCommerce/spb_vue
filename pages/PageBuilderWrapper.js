import React, { useEffect } from 'react'

import { PageBuilderComponent, usePbFinder } from 'simi-pagebuilder-react'
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import Category from './components/Category';
import CategoryList from './components/CategoryList';
import './style.scss';
import {extractBaseUrlForTapitaQuery} from "~/builder_pages/helpers/tapita/extractBaseUrlForTapitaQuery";

const endPoint = 'https://tapita.io/pb/graphql/';
const integrationToken = '150kG2pgFhmxb6zJVJFSyTAV4oAV1JXc1623205870';

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
    getPageItems: true
  });

  useEffect(() => {
      if (!pageMaskedId || location.pathname !== pathToFind){
        findPage(extractBaseUrlForTapitaQuery(location.pathname));
    }
  }, [location, pageMaskedId, pathToFind, findPage]);

  if (pageMaskedId && pageMaskedId !== 'notfound') {
    return React.createElement(
      PageBuilderComponent,
      {
        key: pageMaskedId,
        endPoint: endPoint,
        maskedId: pageMaskedId,
        pageData: pageData,
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
        className: "pb-background",
        key: 'loader'
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
      className: "pb-background",
      key: 'based'
    },
    [
        React.createElement('div', {className: "loader"}),
        React.createElement('img', {className: "splash-img", src:"/pb/1556608.jpeg"})
    ]
  );
}

export default PageBuilderWrapper;
