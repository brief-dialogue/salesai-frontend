import React from "react";
import styles from "./listCourses.module.css";
import CourseCard from "../courseCard/courseCard";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

export default function ListCourses({ data, onClickReminder }) {
  var n = data.length;
  return (

    <>
      {/* <section id="courses" style={{ paddingTop: "70px" }}>
      <div className={styles.container}>
        <div className="row">
          <div className="col-10">  <h3 className={styles.para}>
            C<span className={styles.span}>ourses</span> O
            <span className={styles.span}>ffered</span>
          </h3></div>
        </div>
        <div className="row m-0">
          {data.map(item => (
            <CourseCard
              key={item.id}
              backgroundImage={item.attributes.thumbnail.data.attributes.url == null ? "/Images/c1.jpg" : item.attributes.thumbnail.data.attributes.url}
              title={item.attributes.title}
              description={item.attributes.description}
              id={item.id}
              author={item.attributes.author} />
          ))}
        </div>
        <div className={styles.button}>
          <button type="submit" className={styles.btn} onClick={onClickReminder}>
            View More
          </button>
        </div>
      </div>
    </section> */}

    <MDBContainer>
      <MDBRow>
        <MDBCol className="text-center">

        <h3 className={styles.para}>
            C<span className={styles.span}>ourses</span> O
            <span className={styles.span}>ffered</span>
          </h3>
          
        </MDBCol>
      </MDBRow>
      <MDBRow>
      {data.map(item => (
            <CourseCard
              key={item.id}
              backgroundImage={item.attributes.thumbnail.data.attributes.url == null ? "/Images/c1.jpg" : item.attributes.thumbnail.data.attributes.url}
              title={item.attributes.title}
              description={item.attributes.description}
              id={item.id}
              author={item.attributes.author} />
          ))}

      </MDBRow>
    </MDBContainer>

    </>

  );
};

