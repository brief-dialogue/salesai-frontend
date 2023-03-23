import React from "react";
import styles from "./courseCard.module.css";
import Link from "next/link";

export default function CourseCard({ backgroundImage, title, description, id, author }) {

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
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
    </div>

  );
};