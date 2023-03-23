import { MDBBtn, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBSpinner } from "mdb-react-ui-kit"
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify"

// profile Avatar at the end of navabr
export default function ProfileNavItem({loginStatus,setLoginStatus,user,setUser}){


    

    
    const [showLogoutSpinner, setShowLogoutSpinner] = useState(false);
    // const [userEmail , setUserEmail] = useState("");
    const [isLogIn,setIsLogIn] = useState(false);




    function handleLogout(){

        setShowLogoutSpinner(true);

        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER_ID");
        localStorage.removeItem("EMAIL");

        setShowLogoutSpinner(false);
        setLoginStatus(!loginStatus);
        toast.success("Successfuly Logged Out")

    }
    

    return (

        <>

        <MDBDropdown> 
            <MDBDropdownToggle floating><MDBIcon fas size="2x" icon="user" /></MDBDropdownToggle>
            <MDBDropdownMenu>
            <MDBDropdownItem link childTag='button'>
                {user['email']}
            </MDBDropdownItem>
            <MDBDropdownItem  onClick={handleLogout}link childTag='button'>
                {(showLogoutSpinner)?(<MDBSpinner grow size="sm"><span className='visually-hidden'>Loading...</span></MDBSpinner>):"Logout"}
            </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>


        </>
    )
   

}

