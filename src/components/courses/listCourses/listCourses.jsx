import React from "react";
import styles from "./listCourses.module.css";
import CourseCard  from "../courseCard/courseCard";

export default function ListCourses({data,onClickReminder})  {
 var n = data.length;
 console.log(data[0].attributes.thumbnail);
  return (
    <section id="courses" style={{ paddingTop: "70px" }}>
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
            backgroundImage={item.attributes.thumbnail==null?"/Images/c1.jpg":item.attributes.thumbnail!=0}
             title = {item.attributes.title}
              description={item.attributes.description}
              id= {item.id}/>
      ))}
        </div>
        <div className={styles.button}>
          <button type="submit" className={styles.btn} onClick ={onClickReminder}>
            View More
          </button>
        </div>
      </div>
    </section>
  );
};
