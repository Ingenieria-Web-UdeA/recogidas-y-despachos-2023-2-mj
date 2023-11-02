import { PrivateComponent } from '@/components/PrivateComponent';
import { PrivateRoute } from '@/components/PrivateRoute';
import { DateFilters } from '@/components/collections/DateFilters';
import { DataCard } from '@/components/shipments/DataCard';
import { useGetShipments } from '@/hooks/useGetShipments';
import { useGetUsers } from '@/hooks/useGetUsers';

const ShipmentsPageWrapper = () => {
  return (
    <PrivateRoute>
      <ShipmentsPage />
    </PrivateRoute>
  );
};

const ShipmentsPage = () => {
  const { users } = useGetUsers();
  const { shipments, summaryData, isLoading } = useGetShipments();

  if (isLoading) return <div>Loading...</div>;

  // const racimosRecogidos = shipments?.reduce((acc, shipment) => {
  //   return acc + shipment.shippedBunches;
  // }, 0);

  // const kilosEntregados = shipments?.reduce((acc, shipment) => {
  //   return acc + shipment.deliveredWeight;
  // }, 0);

  // const pesoPorRacimo = (kilosEntregados ?? 0) / (racimosRecogidos ?? 1);

  return (
    <div className='flex flex-col items-center gap-3 p-10'>
      <section className=''>
        <div className='flex flex-col items-center gap-3'>
          <h1>Despachos</h1>
          <DateFilters />
        </div>
      </section>
      <section className='flex justify-center w-full'>
        <div className='flex gap-4'>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th>Despacho</th>
                <th>Fecha</th>
                <th>Racimos despachados</th>
                <th>Peso por racimo</th>
                <th>Kilos entregados en planta</th>
                <PrivateComponent roleName='ADMIN'>
                  <th>Usuario</th>
                </PrivateComponent>
              </tr>
            </thead>
            <tbody>
              {shipments?.map((shipment, index) => {
                return (
                  <tr key={shipment.id}>
                    <td>{index + 1}</td>
                    <td>{new Date(shipment.shipmentDate).toDateString()}</td>
                    <td>{shipment.shippedBunches}</td>
                    <td>{shipment.bunchWeight.toFixed(2)}</td>
                    <td>{shipment.deliveredWeight}</td>
                    <PrivateComponent roleName='ADMIN'>
                      <td>
                        {users?.find((usr) => usr.id === shipment.userId)?.name}
                      </td>
                    </PrivateComponent>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PrivateComponent roleName='ADMIN'>
            <div className='flex flex-col gap-5'>
              <DataCard
                title='Racimos recogidos'
                indicator={summaryData?.totalRacimos ?? 0}
              />
              <DataCard
                title='Peso por racimo'
                indicator={parseFloat(
                  (summaryData?.pesoPromedio ?? 0).toFixed(2)
                )}
              />
              <DataCard
                title='Kilos entregados en planta'
                indicator={summaryData?.totalKilos ?? 0}
              />
            </div>
          </PrivateComponent>
        </div>
      </section>
    </div>
  );
};

export default ShipmentsPageWrapper;
