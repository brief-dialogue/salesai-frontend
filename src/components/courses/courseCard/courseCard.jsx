import React from "react";
import styles from "./courseCard.module.css";
import Link from "next/link";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBFooter } from "mdb-react-ui-kit";

export default function CourseCard({ backgroundImage, title, description, id, author }) {

  return (

    <>

      <MDBCol sm={6} md={6} lg={4} xl={3}>

        
          <MDBCard className="m-3" border="success">
            <MDBCardImage src={backgroundImage} position='top' alt='course' />
            <MDBCardBody className="p-2 text-center">
              <MDBCardTitle >{title}</MDBCardTitle>
              <MDBCardText className="text-muted">
                {description}
              </MDBCardText>
              <Link href={{ pathname: `/courses/${title}`, query: { courseId: id } }}><MDBBtn>Click</MDBBtn></Link>
            </MDBCardBody>
            <MDBFooter className="p-2">
              <i>by {author}</i>
            </MDBFooter>
          </MDBCard>

      </MDBCol>


      {/* <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
        <Link href={{ pathname: `/courses/${title}`, query: { courseId: id } }}>
          <div className={styles.card}>
            <div className={styles.img}>
              <img className={styles.cardimg} src={backgroundImage} alt="course" height={220} width={150} />
            </div>
            <div className={styles.cardbody}>

              <p className={styles.ctitle}>
                {title}
              </p>
              <p className={styles.description}>
                {description}
              </p>
              <div className={styles.footer}>
                <i className={styles.span}>by</i>{author}
              </div>
            </div>
          </div>
        </Link>
      </div> */}

    </>



  );
};