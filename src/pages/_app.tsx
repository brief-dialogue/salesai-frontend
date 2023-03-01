import '@/styles/globals.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import 'react-toastify/dist/ReactToastify.min.css';

import Layout from '../components/layout'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  const [user,setUser] = useState({"token":"","email":"","id":"","isLogIn":false});
  const [loginStatus,setLoginStatus] = useState(false);

  useEffect(()=>{

      let access_token = localStorage.getItem("ACCESS_TOKEN")
      let user_email = localStorage.getItem("EMAIL")
      let user_id = localStorage.getItem("USER_ID")
      
      if(access_token && user_email && user_id){

          setUser({"token":access_token,"email":user_email,"id":user_id,"isLogIn":true})
      }
      else{

          setUser({"token":"","email":"","id":"","isLogIn":false})
      }

      console.log(user);

  },[loginStatus])
  return(

    <Layout loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser}>
      <ToastContainer />
      <Component loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser} {...pageProps} />
    </Layout>

  ) 
  
  
}
