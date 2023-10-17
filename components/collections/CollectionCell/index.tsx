import { Collection } from '@/types';
import { useState } from 'react';
import { MdCheckCircleOutline, MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';
import { API_ROUTES } from '@/service/apiConfig';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Spinner } from '@/components/ui/Spinner';
import { Tooltip } from '@/components/ui/Tooltip';

interface CollectionCellProps {
  collection: Collection;
  dateFilters: {
    year: number;
    month: string;
  };
}

const CollectionCell = ({ collection, dateFilters }: CollectionCellProps) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [bunches, setBunches] = useState(collection.bunches ?? 0);

  const updateCollection = async (newBunches: number) => {
    setLoading(true);
    try {
      await axios.request({
        method: 'PUT',
        url: `${API_ROUTES.collections}/${collection.id}`,
        data: { bunches: newBunches },
      });
      await mutate(
        `${API_ROUTES.collections}?year=${dateFilters.year}&month=${
          parseInt(dateFilters.month) + 1
        }`
      );
      toast.success('Recogida actualizada correctamente');
      setEditing(false);
    } catch (error) {
      toast.error('Error actualizando la recogida');
    }

    setLoading(false);
  };

  if (loading)
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    );
  return (
    <div className='flex justify-center'>
      {editing ? (
        <div className='flex items-center gap-2'>
          <input
            className='w-10'
            value={bunches.toString()}
            onChange={(e) => {
              setBunches(parseInt(e.target.value));
            }}
            // onBlur={(e) => {
            //   if (parseInt(e.target.value) !== collection.bunches) {
            //     updateCollection(parseInt(e.target.value));
            //   }
            // }}
          />
          <Tooltip description='Confirmar recogida'>
            <button
              onClick={() => {
                if (collection.bunches !== bunches) {
                  updateCollection(bunches);
                }
              }}
              className='text-lg font-bold text-green-500 mt-2'
            >
              <MdCheckCircleOutline />
            </button>
          </Tooltip>
          <Tooltip description='Cancelar'>
            <button
              className='text-lg font-bold text-red-500 mt-2'
              onClick={() => {
                setEditing(false);
              }}
            >
              <MdOutlineCancel />
            </button>
          </Tooltip>
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>
          {collection.bunches ?? 0}{' '}
        </button>
      )}
    </div>
  );
};

export { CollectionCell };
