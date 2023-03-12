import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';

import { toast } from 'react-toastify';
import Link from 'next/link';
import LoginSignupModal from './loginSignupModal';
import ProfileNavItem from './profileNavItem';
import useLoginStore from "../hooks/useLoginStore"



function Navbar({ loginStatus, setLoginStatus, user, setUser }) {


    const navItemList = [["Home","/"],["Onboarding", "/onboarding"], ["Chat Analyzer", "/chatAnalyzer"], ["Practice", "/practice"], ["Manage Clients", "/manageClients"], ["Resources", "/resources"], ["Learn", "/learn"], ["Personal Analytics", "/personalAnalytics"]]
    const [showNav, setShowNav] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLogoutSpinner, setShowLogoutSpinner] = useState(false);
    // const [isLogIn,setIsLogIn] = useState(false);
    const toggleModal = () => setShowModal(!showModal);


    // on first render
    // useEffect(()=>{

    //     let access_token = localStorage.getItem("ACCESS_TOKEN")

    //     if(access_token) setIsLogIn(true);

    // },[])

    return (

        <>
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>SalesAI</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNav(!showNav)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav >
                            {navItemList.map((item) =>

                                (<MDBNavbarItem key={item[1]}>
                                    <Link href={item[1]} className='nav-link'>{item[0]}</Link>
                                </MDBNavbarItem>)
                            )}
                            {/* <MDBNavbarItem>
                                <Link href='/' className='nav-link'> Home</Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <Link href="/clients" className='nav-link'>About</Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                                    Disabled
                                </MDBNavbarLink>
                            </MDBNavbarItem> */}
                        </MDBNavbarNav>
                        <MDBNavbarNav right fullWidth={false}>
                            <MDBNavbarItem>
                                {(user["isLogIn"]) ? (<ProfileNavItem loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser} />) : (<MDBBtn onClick={toggleModal}>Login</MDBBtn>)}

                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBContainer>
            </MDBNavbar>

            {/* Login Modal */}
            <LoginSignupModal loginStatus={loginStatus} setLoginStatus={setLoginStatus} user={user} setUser={setUser} showModal={showModal} setShowModal={setShowModal} toggleModal={toggleModal} />

        </>


    );
}

export default Navbar;