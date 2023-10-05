import { Navbar } from '@/components/ui/Navbar';
import { ToastContainer } from 'react-toastify';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Navbar />
      {children}
      <ToastContainer />
    </main>
  );
};

export { Layout };
