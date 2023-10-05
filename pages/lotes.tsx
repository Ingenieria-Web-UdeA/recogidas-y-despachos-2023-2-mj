import Link from 'next/link';

const LotsPage = () => {
  return (
    <div>
      <section>
        <Link href='/'>
          <span>Home</span>
        </Link>
        <div className='w-full flex justify-center'>
          <h1>Gestión de lotes</h1>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default LotsPage;
