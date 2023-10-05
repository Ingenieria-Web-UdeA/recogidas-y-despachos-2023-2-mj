import { Dialog } from '@/components/ui/Dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '@/service/apiConfig';
import { toast } from 'react-toastify';
import { User } from '@/types';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import { refetchUsers } from '@/hooks/useGetUsers';

interface DeleteUserDialogInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const DeleteUserDialog = ({
  open,
  setOpen,
  user,
}: DeleteUserDialogInterface) => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    setLoading(true);

    try {
      await axios.request({
        method: 'DELETE',
        url: `${API_ROUTES.users}/${user.id}`,
      });
      await refetchUsers();
      toast.success('Usuario eliminado correctamente');
      setOpen(false);
    } catch (error) {
      toast.error('Error eliminando el usuario');
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      title={`Eliminar Usuario ${user.name}`}
    >
      <div className='flex flex-col items-center gap-6'>
        <h3>¿Está seguro de querer eliminar el usuario?</h3>
        <div className='flex gap-3'>
          <PrimaryButton
            loading={loading}
            onClick={deleteUser}
            text='Confirmar'
          />
          <SecondaryButton
            loading={loading}
            onClick={() => setOpen(false)}
            text='Cancelar'
          />
        </div>
      </div>
    </Dialog>
  );
};

export { DeleteUserDialog };
