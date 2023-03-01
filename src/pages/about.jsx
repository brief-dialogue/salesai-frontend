export default function About({loginStatus,setLoginStatus,user,setUser}){


    return(

        <>
         {(user['isLogIn'])?(<p>Hello {user['email']}</p>):<p>Not Logged in </p>}
        </>
    )
}