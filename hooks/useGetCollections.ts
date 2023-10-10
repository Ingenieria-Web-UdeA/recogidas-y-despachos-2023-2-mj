import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { CollectionsQuery } from '@/types';
import useSWR from 'swr';

const useGetCollections = () => {
  const { data, error, isLoading } = useSWR<CollectionsQuery>(
    API_ROUTES.collections,
    fetcher
  );

  return { collections: data?.collections, error, isLoading };
};

export { useGetCollections };
