import { PrivateComponent } from '@/components/PrivateComponent';
import { PrimaryButton } from '@/components/ui/Buttons';
import { NavigationCard } from '@/components/ui/NavigationCard';
import { useSession, signIn } from 'next-auth/react';

const Home = () => {
  const { status } = useSession();
  return (
    <main className='flex flex-col h-screen w-full items-center justify-center gap-4'>
      <h1>Sistema de recogidas y despachos</h1>
      {status === 'authenticated' ? (
        <div className='flex gap-4'>
          <NavigationCard
            title='Lotes'
            description='Gestionar los lotes de la finca'
            href='/lotes'
          />
          <NavigationCard
            title='Recogidas'
            description='Crear y visualizar recogidas'
            href='/recogidas'
          />
          <NavigationCard
            title='Envíos'
            description='Crear y visualizar envíos'
            href='/envios'
          />
          <PrivateComponent roleName='ADMIN'>
            <NavigationCard
              title='Usuarios'
              description='Gestionar los usuarios de la plataforma'
              href='/usuarios'
            />
          </PrivateComponent>
        </div>
      ) : (
        <div>
          <PrimaryButton
            text='Iniciar sesión'
            loading={status === 'loading'}
            onClick={() => {
              signIn('auth0');
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
