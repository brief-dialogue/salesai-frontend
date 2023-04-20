import { useRouter } from "next/router";
import Chapter from "../../components/courses/chapter/chapter";
import ListOfChapter from "../../components/courses/listOfChapters/listOfChapter";
import useFetch from "@/hooks/usefetch";
import { MDBSpinner } from "mdb-react-ui-kit";
import { useState } from "react";
import { courseDetailesUrl } from "../api/urls";
export default function CourseDetail({ loginStatus, setLoginStatus, user, setUser }) {
	const [currentChapter, setCurrentChapter] = useState(1);
	const router = useRouter();
	const courseName = router.query.courseName;
	const courseId = router.query.courseId;
	const response = useFetch("GET", courseDetailesUrl(courseId), user['token']);
	if (response.isLoading) return <MDBSpinner color='success' role='status' />
	if (response.apiError) return <p className="mx-auto text-center"> Please Error</p>;
	const data = response.apiData;

	if (data.length == 0) return <p className="mx-auto text-center"> There are no chapters for this course</p>;
	const chpatersList = data['attributes'].chapters.data;


	return (
		<>
			<section >
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
							<ListOfChapter currentChapter={currentChapter} chapterList={chpatersList} updatedChapter={(i) => setCurrentChapter(i + 1)} />
						</div>
						<div className="col-lg-9 col-md-13 col-sm-12 col-xs-12">
							<Chapter id={currentChapter} token={user['token']} n={chpatersList.length} updatedId={(id) => setCurrentChapter(id)} />
						</div>

					</div>
				</div>
			</section>
		</>)

}