import { useDateFilters } from '@/atoms/dateFilters';
import { API_ROUTES, fetcher } from '@/service/apiConfig';
import { ShipmentSummaryQuery, ShipmentsQuery } from '@/types';
import useSWR from 'swr';

const useGetShipments = () => {
  const { dateFilters } = useDateFilters();

  const {
    data: shipmentsData,
    error: shipmentsError,
    isLoading: shipmentsLoading,
  } = useSWR<ShipmentsQuery>(
    `${API_ROUTES.shipments}?year=${dateFilters.year}&month=${
      dateFilters.month + 1
    }`,
    fetcher
  );

  const {
    data: summaryData,
    error: summaryError,
    isLoading: summaryLoading,
  } = useSWR<ShipmentSummaryQuery>(
    `${API_ROUTES.shipmentSummary}?year=${dateFilters.year}&month=${
      dateFilters.month + 1
    }`,
    fetcher
  );

  return {
    summaryData: summaryData?.summaryData,
    shipments: shipmentsData?.shipments,
    shipmentsError,
    summaryError,
    isLoading: shipmentsLoading || summaryLoading,
  };
};

export { useGetShipments };
