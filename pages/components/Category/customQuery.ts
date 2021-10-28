import { useCustomQuery } from '@vue-storefront/magento';

export const customQuery = (id?: string) => {
    const {
        error,
        loading,
        query,
        result,
        setQueryString,
    } = useCustomQuery(id);

    setQueryString(`
  query categories($filters: CategoryFilterInput!) {
    categories(filters:$filters) {
        items{
            id
            url_key
            url_path
            url_suffix
            name
            image
          }
          total_count
    }
  }`);

    return {
        error,
        loading,
        query,
        result,
    };
};