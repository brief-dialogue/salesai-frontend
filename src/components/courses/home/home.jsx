import React,{ useState }  from "react";
import styles from "./Home.module.css";


export default function Home({onSubmitHandler}){
  const [query, setQuery] = useState('');

  return (
    <section id="home">
      <div className={styles.bg}>
        <div className={styles.overlay}>
          <label className={styles.para}>
            S<span className={styles.span}>earch</span> F
            <span className={styles.span}>or</span> C
            <span className={styles.span}>ourses</span>
          </label>
          <br />
          <input className={styles.input} value = {query}onChange={e => setQuery(e.target.value)} id="search" name = "search"type="search" />
          
       
          <button type="submit" className={styles.btn} onClick={event => {onSubmitHandler(query)}}>
            Search
          </button>
   
       
        </div>
      </div>
    </section>
  );
};

