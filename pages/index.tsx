import { NavigationCard } from '@/components/ui/NavigationCard';

const Home = () => {
  return (
    <main className='flex flex-col h-screen w-full items-center justify-center gap-4'>
      <h1>Sistema de recogidas y despachos</h1>
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
        <NavigationCard
          title='Usuarios'
          description='Gestionar los usuarios de la plataforma'
          href='/usuarios'
        />
      </div>
    </main>
  );
};

export default Home;
