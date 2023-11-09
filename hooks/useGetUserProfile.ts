import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { ProfileQuery } from '@/types';
import useSWR from 'swr';

const useGetUserProfile = () => {
  const { data, isLoading, error } = useSWR<ProfileQuery>(
    API_ROUTES.profile,
    fetcher
  );

  return {
    userProfile: data?.userProfile,
    isLoading,
    error,
  };
};

export { useGetUserProfile };
