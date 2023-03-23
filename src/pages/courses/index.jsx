


import Home from '../../components/courses/home/home'
import ListCourses from '../../components/courses/listCourses/listCourses'
import useFetch from "../../hooks/usefetch";
import { MDBSpinner } from "mdb-react-ui-kit";
import { useState } from 'react';


export default function Courses({ loginStatus, setLoginStatus, user, setUser }) {
  if (!user['isLogIn']) {
    return (<p className="mx-auto text-center"> Please Log In</p>);
  }
  const [query, setQuery] = useState('');
  // const [allData,setAllData] = useState(false);
  var response;
  if (query.length == 0) {

    //if(allData){
    response = useFetch("GET", "http://localhost:1337/api/courses?&populate[thumbnail][fields][0]=url", user['token']);
    console.log(response);
    // }
    // else{
    //   response= useFetch("GET","http://localhost:1337/api/courses?pagination[start]=0&pagination[limit]=4",user['token']);
    // }
  } else {
    response = useFetch("GET", `http://localhost:1337/api/courses?filters[title][$contains]=${query.trim()}`, user['token']);
  }

  return (
    <>
      <Home onSubmitHandler={(query) => setQuery(query)} />
      {
        response.isLoading ?
          <MDBSpinner color='success' role='status' /> :
          response.apiError ? <p className="mx-auto text-center">Erro</p> :
            response.apiData.length == 0 ? <p className="mx-auto text-center">No Data Found</p> :
              <ListCourses data={response.apiData} onClickReminder={() => { }} />
      }


    </>
  )
}