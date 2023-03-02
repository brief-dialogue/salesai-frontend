import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import { Grid } from 'gridjs-react';

export default function ManageClients({ loginStatus, setLoginStatus, user, setUser }) {


    // default content
    let content = (
        <p className="mx-auto text-center"> Please Log In</p>
    );

    if (user['isLogIn']) {

        content = (

            <MDBCard shadow="3" border="primary" center>
                <MDBCardHeader center>Manage Clients</MDBCardHeader>
                <MDBCardBody>
                <Grid
                        data={[
                            ['John', 'john@example.com'],
                            ['Mike', 'mike@gmail.com']
                        ]}
                        columns={['Name', 'Email']}
                        search={true}
                        pagination={{
                            limit: 1,
                        }}
                    />

                </MDBCardBody>
            </MDBCard>





        );
    }



    return (

        <>
            <MDBContainer className="m-5">
                {content}
            </MDBContainer>

        </>
    );
}