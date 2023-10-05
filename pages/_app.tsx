import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '@/layouts';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
