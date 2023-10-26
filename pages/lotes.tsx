import { PrivateComponent } from '@/components/PrivateComponent';
import { PrivateRoute } from '@/components/PrivateRoute';
import { useGetLots } from '@/hooks/useGetLots';

const LotsPageWrapper = () => {
  return (
    <PrivateRoute>
      <LotsPage />
    </PrivateRoute>
  );
};

const LotsPage = () => {
  const { lots, isLoading } = useGetLots();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='p-10 flex flex-col gap-3 items-center'>
      <section>
        <div className='w-full flex justify-center'>
          <h1>Gestión de lotes</h1>
        </div>
      </section>
      <section className='flex justify-center'>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de creación</th>
              <PrivateComponent roleName='ADMIN'>
                <th>Acciones</th>
              </PrivateComponent>
            </tr>
          </thead>
          <tbody>
            {lots?.map((lot) => {
              return (
                <tr key={lot.id}>
                  <td>{lot.name}</td>
                  <td>{new Date(lot.createdAt).toLocaleDateString()}</td>
                  <PrivateComponent roleName='ADMIN'>
                    <td></td>
                  </PrivateComponent>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LotsPageWrapper;
