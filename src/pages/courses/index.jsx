


import ListOfChapter from '@/components/courses/listOfChapters/listOfChapter';
import Home from '../../components/courses/home/home'
import ListCourses from '../../components/courses/listCourses/listCourses'
import useFetch from "../../hooks/usefetch";
import { MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import { useState } from 'react';
import { ListOfCourseFilterUrl, ListOfCourseUrl } from '../api/urls';
import Loader from '@/components/loader';
import { toast } from 'react-toastify';


export default function Courses({ loginStatus, setLoginStatus, user, setUser }) {

  const [query, setQuery] = useState('');
  // const [allData,setAllData] = useState(false);
  var response;


  //if(allData){
  response = useFetch("GET",
    query.trim().length == 0 ? ListOfCourseUrl() :
      ListOfCourseFilterUrl(query)
    , user['token']);
  // }
  // else{
  //   response= useFetch("GET","http://localhost:1337/api/courses?pagination[start]=0&pagination[limit]=4",user['token']);
  // }  

  if (!user['isLogIn']) {
    return (<p className="mx-auto text-center"> Please Log In</p>);
  }
  return (
    <>
      <Home onSubmitHandler={(query) => setQuery(query)} />
      {
        response.isLoading ?
          <span className='text-center mx-auto'><Loader/></span> :
          response.apiError ? toast.error("Some error occured :("):
            response.apiData.length == 0 ? <p className="mx-auto text-center">No Data Found</p> :
              <ListCourses data={response.apiData} onClickReminder={() => { }} />
      }


    </>
  )
}