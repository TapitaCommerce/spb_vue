import {useVueRouter} from '~/helpers/hooks/useVueRouter';

const compositionApi = require('@nuxtjs/composition-api')

const usePlaceholderHook = () => {
  const {router} = useVueRouter()
  return router
}

export const useNavigationHook = (compositionApi && compositionApi.useRouter) ?
  compositionApi.useRouter : usePlaceholderHook
