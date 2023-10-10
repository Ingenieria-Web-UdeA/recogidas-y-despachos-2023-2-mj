import { PrimaryButton, SecondaryButton } from '@/components/ui/Buttons';
import { Dialog } from '@/components/ui/Dialog';
import { useGetRoles } from '@/hooks/useGetRoles';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { API_ROUTES } from '@/service/apiConfig';
import { refetchUsers } from '@/hooks/useGetUsers';

interface NewUserDialogInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewUserDialog = ({ open, setOpen }: NewUserDialogInterface) => {
  const [loading, setLoading] = useState(false);
  const { roles } = useGetRoles();
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roleId: '',
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // crear usuario
      await axios.request({
        method: 'POST',
        url: API_ROUTES.users,
        data: {
          ...newUser,
        },
      });

      // mutar la tabla
      await refetchUsers();

      toast.success('Usuario creado correctamente');
      setOpen(false);
    } catch (e: unknown) {
      const error = e as AxiosError;

      const errorData = error?.response?.data as { message: string };

      if (
        errorData?.message?.includes(
          'Unique constraint failed on the fields: (`email`)'
        )
      ) {
        toast.error('Error creando el usuario: el email utilizado ya existe.');
      } else {
        toast.error('Error creando el usuario');
      }
    }
    setLoading(false);
  };

  return (
    <Dialog
      title='Crear nuevo usuario'
      open={open}
      onClose={() => setOpen(false)}
    >
      <form className='flex flex-col gap-3' onSubmit={submitForm}>
        <label htmlFor='user-name'>
          <span>
            Nombre <span className='text-red-500'>*</span>
          </span>
          <input
            value={newUser.name}
            onChange={(e) => {
              setNewUser({ ...newUser, name: e.target.value });
            }}
            name='user-name'
            type='text'
            placeholder='Jhon Doe'
            required
          />
        </label>

        <label htmlFor='email'>
          <span>
            Correo <span className='text-red-500'>*</span>
          </span>
          <input
            value={newUser.email}
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value });
            }}
            name='email'
            type='email'
            placeholder='user@user.com'
            required
          />
        </label>

        <label htmlFor='role'>
          <span>
            Rol <span className='text-red-500'>*</span>
          </span>
          <select
            name='role'
            value={newUser.roleId}
            onChange={(e) => {
              setNewUser({ ...newUser, roleId: e.target.value });
            }}
            required
          >
            <option disabled value=''>
              Seleccione un rol
            </option>
            {roles?.map((role) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              );
            })}
          </select>
        </label>

        <div className='flex gap-3 w-full justify-center'>
          <PrimaryButton
            loading={loading}
            text='Guardar'
            onClick={() => {}}
            type='submit'
          />
          <SecondaryButton
            onClick={() => setOpen(false)}
            text='Cancelar'
            loading={loading}
            type='button'
          />
        </div>
      </form>
    </Dialog>
  );
};

export { NewUserDialog };
