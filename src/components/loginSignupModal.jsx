import { MDBSpinner, MDBInput, MDBBtn, MDBIcon, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_STRAPI_URL } from "../environment"

export default function LoginSignupModal({ showModal, setShowModal, toggleModal }) {

    const [isBrowser, setIsBrowser] = useState(false); // use to show if browser is fully loaded
    const [showLoginView, setShowLoginView] = useState(true);
    const [showLoginSpinner, setShowLoginSpinner] = useState(false);
    const [showRegisterSpinner, setShowRegisterSpinner] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");




    const [formValue, setFormValue] = useState({

        "email": "",
        "password": ""
    });

    const onFormInputChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };


    // have to use useEffect because of SSR , otherwise shows document not defined error
    useEffect(() => {
        setIsBrowser(typeof window !== "undefined");
    }, []);


    function handleLogin() {

        setShowLoginSpinner(true);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({ "identifier": formValue['email'], "password": formValue["password"] });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // @ts-ignore
        fetch(`${BASE_STRAPI_URL}/auth/local/`, requestOptions)
            .then(response => response.json())
            .then(result => {


                setShowLoginSpinner(false);

                if (result.error) {

                    setLoginError(result.error.message);

                }
                else {

                    // save to localstorage
                    setLoginError("");
                    toast.success("Successfuly Logged In")
                    localStorage.setItem("ACCESS_TOKEN", result.jwt);
                    localStorage.setItem("USER_ID", result.user.id);
                    localStorage.setItem("EMAIL", result.user.email);

                }


            })
            .catch(error => {

                setShowLoginSpinner(false)
                console.log("error", error);
                toast.error("Some error occured :(");


            });


    }

    function handleRegister() {

        setShowRegisterSpinner(true);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({ "username":formValue['email'],"email": formValue['email'], "password": formValue["password"] });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // @ts-ignore
        fetch(`${BASE_STRAPI_URL}/auth/local/register`, requestOptions)
            .then(response => response.json())
            .then(result => {


                setShowRegisterSpinner(false);

                if (result.error) {

                    setRegisterError(result.error.message);

                }
                else {

                    // save to localstorage
                    setRegisterError("");
                    toast.success("Successfuly Registered");
                    localStorage.setItem("ACCESS_TOKEN", result.jwt);
                    localStorage.setItem("USER_ID", result.user.id);
                    localStorage.setItem("EMAIL", result.user.email);

                }


            })
            .catch(error => {

                setShowRegisterSpinner(false)
                console.log("error", error);
                toast.error("Some error occured :(");


            });

    }

    const toastTest = () => { toast(document.cookie) }

    function loginTest() {

        document.cookie = "testing";

    }


    // default modalBody
    let modalBody = (<MDBSpinner grow color='primary'><span className='visually-hidden'>Loading...</span></MDBSpinner>);

    if (showLoginView) {

        modalBody = (

            <form>

                <MDBInput className='mb-4' onChange={onFormInputChange} type='email' id='form3Example3' name="email" label='Email address' required />
                <MDBInput className='mb-4' onChange={onFormInputChange} type='password' id='form3Example4' name="password" label='Password' required />

                <p className="error" style={{ display: (loginError == "") ? 'none' : 'block' }}>{loginError}</p>
                <MDBBtn type='button' className='mb-4' onClick={handleLogin} block>
                    {(showLoginSpinner) ? (<MDBSpinner grow size="sm"><span className='visually-hidden'>Loading...</span></MDBSpinner>) : "Login"}
                </MDBBtn>

                <div className='text-center'>
                    <p>
                        Not a member? <a href="javascript:void(0)" onClick={() => { setShowLoginView(false) }}>Register</a>
                    </p>
                    <p>or sign up with:</p>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='google' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </div>
            </form>



        );
    }
    else {


        modalBody = (

            <form>

                <MDBInput className='mb-4' onChange={onFormInputChange} type='email' id='form3Example3' name="email" label='Email address' required />
                <MDBInput className='mb-4' onChange={onFormInputChange} type='password' id='form3Example4' name="password" label='Password' required />


                <p className="error" style={{ display: (registerError == "") ? 'none' : 'block' }}>{registerError}</p>
                <MDBBtn type='button' className='mb-4' onClick={handleRegister} block>
                    {(showRegisterSpinner) ? (<MDBSpinner grow size="sm"><span className='visually-hidden'>Loading...</span></MDBSpinner>) : "Register"}
                </MDBBtn>

                <div className='text-center'>
                    <p>
                        Already a member? <a href="javascript:void(0)" onClick={() => { setShowLoginView(true) }}>Login</a>
                    </p>
                    <p>or sign up with:</p>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='google' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </div>
            </form>



        );


    }


    return isBrowser ? (<MDBModal show={showModal} setShow={setShowModal} tabIndex='-1'>
        <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                    <MDBModalTitle>{(showLoginView) ? "Login" : "Register"}</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleModal}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>

                    {modalBody}

                </MDBModalBody>

                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleModal}>
                        Close
                    </MDBBtn>
                    <MDBBtn>Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>) : (<p>Modal Not Working</p>)

}