import '@/styles/globals.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import 'react-toastify/dist/ReactToastify.min.css';

import Layout from '../components/layout'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return(

    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>

  ) 
  
  
}
