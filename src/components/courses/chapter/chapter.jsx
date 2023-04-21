
import styles from "./chapter.module.css";
import useFetch from "@/hooks/usefetch";
import { MDBSpinner } from "mdb-react-ui-kit";
import { useState } from "react";
import Markdown from "marked-react";
import Link from "next/link";
import { chapterUrl } from "@/pages/api/urls";
export default function Chapter({ id, token, n, updatedId }) {


  const response = useFetch("GET", chapterUrl(id), token);

  if (response.isLoading) {
    return <MDBSpinner color='success' role='status' />;
  }
  else if (response.apiError) { return <p className="mx-auto text-center"> Please Error</p>; }
  const data = response.apiData;

  if (data.length == 0) { return <p className="mx-auto text-center"> There are no chapters for this course</p>; }

  return (
    <>
      <div className={styles.elevation}>
        <div>
          <div className="mb-5 text-center">

            <h2 className="mt-2 p-3">
              {data['attributes'].heading}
            </h2>
          </div>
          <div>
            <div className="m-4 p-3" >
              <Markdown>{data['attributes'].content}</Markdown>
            </div>
            <Link href="http://localhost:3000/quiz/1" className='nav-link'>Quiz</Link>
            <Link href="http://localhost:3000/erc/1" className='nav-link'>Subjective Questions</Link>
          </div>
        </div>
        {
          id != 1 ?
            <button type="button" className="btn btn-success float-start" onClick={() => { updatedId(id - 1) }}>previous</button> : <div />
        }
        {
          id != n ?
            <button type="button" className="btn btn-success float-end" onClick={() => { updatedId(id + 1) }}>Next
            </button> : <Link href="/courses" className="btn btn-success float-end">Finshed</Link>
        }

        <script defer src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

      </div>
    </>
  )
}