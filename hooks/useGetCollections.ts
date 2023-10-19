import { useDateFilters } from '@/atoms/dateFilters';
import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { CollectionsQuery } from '@/types';
import useSWR from 'swr';

const useGetCollections = () => {
  const { dateFilters } = useDateFilters();
  const { data, error, isLoading } = useSWR<CollectionsQuery>(
    `${API_ROUTES.collections}?year=${dateFilters.year}&month=${
      dateFilters.month + 1
    }`,
    fetcher
  );

  return { collections: data?.collections, error, isLoading };
};

export { useGetCollections };
