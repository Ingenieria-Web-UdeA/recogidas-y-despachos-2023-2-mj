import { DateFilters } from '@/components/collections/DateFilters';
import { DataCard } from '@/components/shipments/DataCard';
import { useGetShipments } from '@/hooks/useGetShipments';

const ShipmentsPage = () => {
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
                  </tr>
                );
              })}
            </tbody>
          </table>
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
        </div>
      </section>
    </div>
  );
};

export default ShipmentsPage;
