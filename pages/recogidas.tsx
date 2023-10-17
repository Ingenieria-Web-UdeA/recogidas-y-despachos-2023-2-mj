import { CollectionCell } from '@/components/collections/CollectionCell';
import { DateFilters } from '@/components/collections/DateFilters';
import { useGetCollections } from '@/hooks/useGetCollections';
import { useGetLots } from '@/hooks/useGetLots';
import _ from 'lodash';
import { useState } from 'react';

const CollectionsPage = () => {
  const [dateFilters, setDateFilters] = useState({ year: 2021, month: '1' });

  const { collections, isLoading } = useGetCollections({ dateFilters });

  const { lots } = useGetLots();

  if (isLoading) return <div>Loading...</div>;

  const collectionsByDate = _.groupBy(collections, 'collectionDate');
  const filteredCollections = Object.keys(collectionsByDate);

  return (
    <div className='flex flex-col items-center gap-3 p-10'>
      <section className=''>
        <div className='flex flex-col items-center gap-3'>
          <h1>Recogidas Diarias</h1>
          <DateFilters
            dateFilters={dateFilters}
            setDateFilters={setDateFilters}
          />
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
                        <CollectionCell
                          dateFilters={dateFilters}
                          collection={collection}
                        />
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

export default CollectionsPage;
