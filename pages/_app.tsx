import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '@/layouts';
import type { AppProps } from 'next/app';
import { Provider } from 'jotai';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
