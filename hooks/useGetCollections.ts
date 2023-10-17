import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { CollectionsQuery } from '@/types';
import useSWR from 'swr';

interface UseGetCollectionsProps {
  dateFilters: {
    year: number;
    month: string;
  };
}

const useGetCollections = ({ dateFilters }: UseGetCollectionsProps) => {
  const { data, error, isLoading } = useSWR<CollectionsQuery>(
    `${API_ROUTES.collections}?year=${dateFilters.year}&month=${
      parseInt(dateFilters.month) + 1
    }`,
    fetcher
  );

  return { collections: data?.collections, error, isLoading };
};

export { useGetCollections };
