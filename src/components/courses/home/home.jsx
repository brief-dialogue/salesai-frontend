import React, { useState } from "react";
import styles from "./home.module.css";
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";
import Image from "next/image"


export default function Home({ onSubmitHandler }) {
  const [query, setQuery] = useState('');

  return (
    <>
      <MDBContainer>

        <MDBRow>

          <MDBCol className="text-center">
            
            <Image src="/search.gif" alt="searching"  height={400}  width={400}/>

          </MDBCol>
          <MDBCol className="my-auto">
          <section id="home">
              <div className="my-auto">
                <label className={styles.para}>
                  S<span className={styles.span}>earch</span> F
                  <span className={styles.span}>or</span> C
                  <span className={styles.span}>ourses</span>
                </label>
                <br />
                <MDBInput className="m-2" value={query} onChange={e => setQuery(e.target.value)} id="search" name="search" type="search" />

                <MDBBtn className="m-2" type="submit" onClick={event => { onSubmitHandler(query) }}>
                <MDBIcon fas icon="search" /> &nbsp;
                  Search
                </MDBBtn>


              </div>

          </section>
          </MDBCol>



        </MDBRow>

        <hr/>

      </MDBContainer>



    </>


  );
};

