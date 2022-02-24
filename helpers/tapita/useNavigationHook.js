import {useVueRouter} from '~/helpers/hooks/useVueRouter';
import {useRouter} from '@nuxtjs/composition-api';

export const useNavigationHook = !!useRouter ? useRouter : useVueRouter
