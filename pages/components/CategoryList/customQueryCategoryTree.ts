import { useCustomQuery } from '@vue-storefront/magento';

export const customQueryCategoryTree = (id?: string) => {
  const {
    error,
    loading,
    query,
    result,
    setQueryString,
  } = useCustomQuery(id);

  setQueryString(`
  query categoryList($filters: CategoryFilterInput!) {
    categoryList(filters:$filters) {
        children_count
    children {
      uid
      level
      name
      image
      path
      url_path
      url_key
      url_suffix
     }
    }
  }`);

  return {
    error,
    loading,
    query,
    result,
  };
};