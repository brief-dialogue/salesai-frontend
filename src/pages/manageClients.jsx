import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBCardTitle, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import { _,Grid } from 'gridjs-react';
import { BASE_STRAPI_URL } from "@/environment";
import Image from 'next/image'
import NotLoggedIn from "@/components/notLoggedIn";



export default function ManageClients({ loginStatus, setLoginStatus, user, setUser }) {


    let content;

    if(!user['isLogIn']){

        content =  (<NotLoggedIn />)
    }
    else{

       content = (

            <MDBCard shadow="3" border="primary" center>
                <MDBCardHeader center>Manage Clients</MDBCardHeader>
                <MDBCardBody>

                <Grid
                        columns={["Sr No","Photo","Name","Email","Contact","Company","Role","Position","Action",{name:"id",hidden:true}]}

                        server={
                            {
                                url:`${BASE_STRAPI_URL}/clients?populate=*`,
                                then: data => data.data.map((client,index)=>{

                                    console.log(client)
                                    let photo_url = (client.attributes.photo.data)?(client.attributes.photo.data.attributes.url):"/avatar.svg";
                                    console.log(photo_url)
                                    let photo_element = _(<Image src={photo_url} alt='' width={45} height={45} className='rounded-circle' />)
                                    return [index,photo_element,client.attributes.name,client.attributes.email,client.attributes.contact,client.attributes.company,client.attributes.role,client.attributes.position,_(<MDBBtn key={`c${client.id}`}>Test</MDBBtn>),client.id]
                                }),
                                method:"GET",
                                headers:{
                                    "Authorization":`Bearer ${user['token']}`
                                },
                                handle:(res) => res.json()

                            }
                        }


                        search={true}
                        pagination={{
                            limit: 100,
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