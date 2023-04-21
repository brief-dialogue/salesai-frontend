import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'

const inter = Inter({ subsets: ['latin'] })


function Banner() {

  const name = "SalesAI";
  const tagline = "automating training and evaluation of salesperson"

  return (

    <MDBRow style={{ backgroundColor: "#bdf2d2" }}>
      <MDBCol className='text-center my-auto'>
        <MDBTypography tag="h2" className='p-5 typewriter'>{name},

          <MDBTypography tag='small' className='text-muted'>
            {tagline}
          </MDBTypography>

        </MDBTypography>

        <MDBBtn tag="a" href="#more">
          Read More
        </MDBBtn>
      </MDBCol>
      <MDBCol className='text-center'>

        <Image src="/banner_art.svg" alt='background_art' width={450} height={450} />

      </MDBCol>
    </MDBRow>
  )


}


function FeatureCard({title, description, image_link}) {

  return (


    <MDBCard className='border-success border-top'>
      <MDBRow>
        <MDBCol className='text-center mx-auto'>

          <MDBTypography variant="h3" className='p-4'>{title}</MDBTypography>
          <hr className="mx-auto" style={{ width: "50%" }} />
          <MDBTypography variant="h4" className='p-4 text-muted'>{description}</MDBTypography>

        </MDBCol>
        <MDBCol className='text-center'>

          <Image src={image_link} alt={title} height={300} width={300} />

        </MDBCol>
      </MDBRow>

    </MDBCard>

  )


}


export default function Home() {

  const features = [

    {
      "title": "Onboarding 🚀",
      "description": "Onboard employees by providing with training materials and courses",
      "image_link": "/docs.svg"

    },

    {
      "title": "Onboarding 🚀",
      "description": "Onboard employees by providing with training materials and courses",
      "image_link": "/docs.svg"

    },


  ]

  return (
    <>
      <MDBContainer fluid className='pt-1'>

        <Banner />
        <MDBRow id="#more" className='m-5'>
          <MDBCol className='text-center'>
            <MDBTypography variant='h3' className='text-muted'>
              Features
            </MDBTypography>

            {features.map((feature => {

              return (

                <MDBRow key={feature.title} className='m-5'>
                  <FeatureCard title={feature.title} description={feature.description} image_link={feature.image_link} />
                </MDBRow>

              )
            }))}


            <MDBRow className='m-5'>
              <FeatureCard title="Onboarding" image_link="/docs.svg" description="Onboard employees by providing with training materials and courses" />
            </MDBRow>

            <MDBRow className='m-5'>
              <FeatureCard title="Onboarding" image_link="/docs.svg" description="Onboard employees by providing with training materials and courses" />
            </MDBRow>

          </MDBCol>
        </MDBRow>

      </MDBContainer>


    </>
  )
}
