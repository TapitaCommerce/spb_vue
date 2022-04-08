import React, { useEffect } from 'react'

import { PageBuilderComponent, usePbFinder } from 'simi-pagebuilder-react'
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import Category from './components/Category';
import CategoryList from './components/CategoryList';
import './style.scss';
import {extractBaseUrlForTapitaQuery} from "~/helpers/tapita/extractBaseUrlForTapitaQuery";

const endPoint = 'https://tapita.io/pb/graphql/';
const integrationToken = '14FJiubdB8n3Byig2IkpfM6OiS6RTO801622446444';

const RegularPage = () => {

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
            location.pathname
        ) {
            if (!pageMaskedId || location.pathname !== pathToFind) {
              const p = extractBaseUrlForTapitaQuery(location.pathname)
              findPage(p)
            }
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
                key: 'loading'
            },
            [
                React.createElement('div', { className: "loader" }),
                React.createElement('img', { className: "splash-img", src: "/pb/1556608.jpeg" })
            ]
        );
    }
    return React.createElement(
        "h1",
        {
            style: { textAlign: 'center', marginTop: '200px', marginBottom: '200px' },
            key: 'based'
        },
        'Page not found'
    );
}
//}

export default RegularPage;
