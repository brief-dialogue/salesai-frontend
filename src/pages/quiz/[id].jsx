import Question from "@/components/question";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQuestion, getQuiz } from "@/pages/api/util";
import Loader from "@/components/loader";

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

function EndCard({ correctCount }) {
    return (
        <div>
            <h1>
                Score Card:
            </h1>
            <p>
                correct ans: {correctCount}
            </p>
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

function QALayout({ quizTitle, quizSynopsis, questionsCount, quizId, qusDetails, setQusDetails }) {

    const [ansDetails, setAnsDetails] = useState({ answer: [], correctCount: 0 })

    const changeQuestion = async (id) => {
        let questionDetails = { qid: id };
        if (id < questionsCount)
            questionDetails = await getQuestion(id);
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
                                    <EndCard correctCount={ansDetails.correctCount} />
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

    const [quizDetails, setQuizDetails] = useState(() => getQuiz(quizId).then(res => setQuizDetails(res)));
    const [qusDetails, setQusDetails] = useState({ qid: -1 });

    let LayoutStyle = {
        backgroundColor: getRandomColor(),
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
        left: '0px',
        zIndex: "1000",
        fontWeight: 500,
        color: "white",
        fontSize: "28px",

    };


    return (<>
        <div style={LayoutStyle} className="d-flex flex-column">
            <div className="d-flex justify-content-between flex-row" style={{ backgroundColor: "black", padding: "10px" }}>
                {quizDetails.quizTitle?quizDetails.quizTitle:"loading..."}
                {
                    qusDetails.qid < quizDetails.questionsCount &&
                    <span>
                        {qusDetails.qid + 1} / {quizDetails.questionsCount}
                    </span>
                }
            </div>
            <div className="d-flex justify-content-around align-items-center flex-fill p-5">
                {
                    quizDetails.quizTitle?
                    <QALayout {...quizDetails} qusDetails={qusDetails} setQusDetails={setQusDetails} />
                    : <Loader/>
                }
            </div>
        </div>
    </>)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    // let colors = ['#000000', '#36454F', '#023020', '#301934', '#343434', '#1B1212', '#28282B', '#191970', '#353935']
    // return colors[Math.floor(Math.random() * colors.length)];
}

