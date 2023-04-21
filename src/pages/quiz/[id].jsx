import Question from "@/components/question";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQuestion, getQuiz, getRandomColor } from "@/pages/api/util";
import Loader from "@/components/loader";
import Link from "next/link";

function StartCard({ quizSynopsis, questionsCount }) {
    return (
        <div style={{ padding: "35px" }}>
            <h3>  Quiz Synopsis:</h3>
            <p style={{ padding: "20px" }}>
                {quizSynopsis}
            </p>
            <h3>No of Questions: </h3>
            <p style={{ padding: "20px" }}>
                {questionsCount}
            </p>
        </div>);
}

function EndCard({ correctCount, goBack }) {
    return (
        <div>
            <h1>
                Score Card:
            </h1>
            <p>
                correct ans: {correctCount}
            </p>
            <button className="btn btn-primary" onClick={goBack}>Quit</button>
        </div>
    )
}

function LeftIcon(props) {
    return (
        <div
            {...props}
            style={{ backgroundColor: "rgba(0,0,0,0.25)", padding: "5px 20px 5px 20px", borderRadius: "20px" }}>
            <i className="fas fa-angle-left"></i>
        </div>

    )
}

function RightIcon(props) {
    return (
        <div
            {...props}
            style={{ backgroundColor: "rgba(0,0,0,0.25)", padding: "5px 20px 5px 20px", direction: "rtl", borderRadius: "20px" }}>
            <i className="fas fa-angle-right"></i>
        </div>

    )
}

function QALayout({ quizTitle, quizSynopsis, questionsCount, quizId, qusDetails, setQusDetails, goBack }) {

    const [ansDetails, setAnsDetails] = useState({ answer: [], correctCount: 0 })

    const changeQuestion = async (id) => {
        let questionDetails = { qid: id };
        if (id < questionsCount)
            questionDetails = await getQuestion(quizId, id);
        setQusDetails(questionDetails);
    }

    const selectAnswer = (answer) => {
        let newAns = { ...ansDetails };
        newAns.answer.push(answer);
        if (answer == qusDetails.correctAnswer)
            newAns.correctCount += 1
        setAnsDetails(newAns);
        changeQuestion(qusDetails.qid + 1);
    }

    return (
        <>
            {
                (
                    (qusDetails) => {
                        switch (qusDetails.qid) {
                            case -1:
                                return (<>
                                    <StartCard quizSynopsis={quizSynopsis} questionsCount={questionsCount} />
                                    <RightIcon onClick={() => changeQuestion(qusDetails.qid + 1)} />
                                </>)
                            case questionsCount:
                                return (<>
                                    <EndCard correctCount={ansDetails.correctCount} goBack={goBack}/>
                                </>)
                            default:
                                return (
                                    <>
                                        {/* <LeftIcon onClick={() => changeQuestion(qusDetails.qid - 1)} /> */}
                                        <Question changeQuestion={changeQuestion} selectAnswer={selectAnswer} {...qusDetails} />
                                        {/* <RightIcon onClick={() => changeQuestion(qusDetails.qid + 1)} /> */}
                                    </>
                                )
                        }
                    }
                )(qusDetails)
            }

        </>
    )
}

export default function Quiz(props) {
    const router = useRouter();
    let quizId = router.query.id;

    const [quizDetails, setQuizDetails] = useState({});
    const [qusDetails, setQusDetails] = useState({ qid: -1 });

    let LayoutStyle = {
        backgroundColor: getRandomColor(),
        width: "100%",
        height: "100%",
        top: "0px",
        left: '0px',
        zIndex: "1000",
        fontWeight: 500,
        color: "white",
        fontSize: "28px",

    };

    useEffect(() => {
        if (!quizId)
            return;
        setQuizDetails(() => getQuiz(quizId).then(res => setQuizDetails(res)));
    }, [quizId])

    const goBack=()=>router.back();

    return (<>
        <div style={LayoutStyle} className="position-fixed d-flex flex-column">
            <div className="d-flex justify-content-between flex-row" style={{ backgroundColor: "black", padding: "10px" }}>
                <Link href="/" style={{ color: "white", textDecoration: "underline" }}>Home</Link>
                {quizDetails["quizTitle"] ? quizDetails["quizTitle"] : "loading..."}

                <span>
                    {qusDetails.qid < quizDetails["questionsCount"] ?
                        <>{(qusDetails.qid + 1)}  /  {quizDetails["questionsCount"]} </>
                        : "0 / 0"
                    }

                </span>

            </div>
            <div className="d-flex justify-content-around align-items-center flex-fill p-5">
                {
                    quizDetails["quizTitle"] ?
                        <QALayout quizTitle={quizDetails["quizTitle"]} quizSynopsis={quizDetails["quizSynopsis"]} questionsCount={quizDetails["quizSynopsis"]} quizId={quizDetails["quizId"]} qusDetails={qusDetails} setQusDetails={setQusDetails} goBack={goBack}/>
                        : <Loader />
                }
            </div>
        </div>
    </>)
}


