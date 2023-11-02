import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { CollectionsIndicatorsQuery } from '@/types';
import useSWR from 'swr';

const useGetCollectionsIndicators = () => {
  const { data, isLoading, error } = useSWR<CollectionsIndicatorsQuery>(
    API_ROUTES.collectionsIndicators,
    fetcher
  );

  return {
    indicators: data?.indicators,
    isLoading,
    error,
  };
};

export { useGetCollectionsIndicators };
