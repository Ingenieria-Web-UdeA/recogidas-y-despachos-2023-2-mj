import Image from 'next/image';
import { UserActions } from '@/components/users/UserActions';
import { useGetRoles } from '@/hooks/useGetRoles';
import { useGetUsers } from '@/hooks/useGetUsers';

const UsersPage = () => {
  const { roles, rolesLoading } = useGetRoles();
  const { users, usersError, usersLoading } = useGetUsers();

  if (usersLoading || rolesLoading) return <div>Loading...</div>;

  if (usersError) return <div>Error al cargar los datos</div>;

  return (
    <div className='flex w-full flex-col items-center gap-3 p-10'>
      <h1>Gestión de usuarios</h1>
      <section className='flex justify-center'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Image
                      src={user.image}
                      width={40}
                      height={40}
                      alt='User image'
                      className='rounded-full'
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {roles?.find((el) => el.id === user.roleId)?.name ?? ''}
                  </td>
                  <td>
                    <UserActions user={user} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UsersPage;
