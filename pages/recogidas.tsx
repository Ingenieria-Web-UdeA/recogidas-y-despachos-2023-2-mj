import { useGetCollections } from '@/hooks/useGetCollections';
import { useGetLots } from '@/hooks/useGetLots';
import _ from 'lodash';

const CollectionsPage = () => {
  const { collections, isLoading } = useGetCollections();
  const { lots } = useGetLots();

  const collectionsByDate = _.groupBy(collections, 'collectionDate');

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col items-center gap-3 p-10'>
      <section className=''>
        <h1>Recogidas Diarias</h1>
      </section>
      <section className='flex justify-center w-full'>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Fecha</th>
              {lots?.map((lot) => {
                return <th key={lot.id}>{lot.name ?? ''}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {Object.keys(collectionsByDate).map((date) => {
              return (
                <tr key={date}>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  {collectionsByDate[date].map((collection) => {
                    return (
                      <td key={collection.id}>{collection.bunches ?? 0} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default CollectionsPage;
