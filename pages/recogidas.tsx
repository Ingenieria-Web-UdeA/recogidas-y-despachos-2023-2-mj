import { PrivateRoute } from '@/components/PrivateRoute';
import { CollectionCell } from '@/components/collections/CollectionCell';
import { DateFilters } from '@/components/collections/DateFilters';
import { useGetCollections } from '@/hooks/useGetCollections';
import { useGetLots } from '@/hooks/useGetLots';
import _ from 'lodash';

const CollectionsPageWrapper = () => {
  return (
    <PrivateRoute>
      <CollectionsPage />
    </PrivateRoute>
  );
};

const CollectionsPage = () => {
  const { collections, isLoading } = useGetCollections();

  const { lots } = useGetLots();

  if (isLoading) return <div>Loading...</div>;

  const collectionsByDate = _.groupBy(collections, 'collectionDate');
  const filteredCollections = Object.keys(collectionsByDate);

  return (
    <div className='flex flex-col items-center gap-3 p-10'>
      <section className=''>
        <div className='flex flex-col items-center gap-3'>
          <h1>Recogidas Diarias</h1>
          <DateFilters />
        </div>
      </section>
      <section className='flex justify-center w-full'>
        <table cellSpacing={0} className=''>
          <thead>
            <tr>
              <th>Fecha</th>
              {lots?.map((lot) => {
                return <th key={lot.id}>{lot.name ?? ''}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredCollections.map((date) => {
              return (
                <tr key={date}>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  {collectionsByDate[date].map((collection) => {
                    return (
                      <td key={collection.id} className='max-w-[80px]'>
                        <CollectionCell collection={collection} />
                      </td>
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

export default CollectionsPageWrapper;
