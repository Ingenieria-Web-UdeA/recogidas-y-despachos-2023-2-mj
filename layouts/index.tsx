import { Navbar } from '@/components/ui/Navbar';
import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (status === 'authenticated')
    return (
      <main>
        <Navbar />
        {children}
        <ToastContainer />
      </main>
    );

  return <PublicLayout>{children}</PublicLayout>;
};

const PublicLayout = ({ children }: LayoutProps) => {
  return <main>{children}</main>;
};

export { Layout };
