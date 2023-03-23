import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { getAnalysis, getRandomColor, getSubjectiveQuestion } from "@/pages/api/util";
import Loader from "@/components/loader";
import Link from "next/link";

function QALayout(props) {

    const [result, setResult] = useState({ "isAnalyzied": false });
    const [answer, setAnswer] = useState("");
    const checkAnswer = () => {
        getAnalysis(props.answer, answer).then(res => setResult({...res, "isAnalyzied": true}));
    }
    return (
        <>
            {
                result.isAnalyzied ?
                    <div>
                        Your answer matched: {(result.score * 100).toPrecision(2)}%
                    </div>
                    :
                    <>
                        <div>
                            {props.question}
                        </div>
                        <form className="w-50" style={{ backgroundColor: "rgba(0,0,0,.25)" }}>
                            <div className="form-outline form-white">
                                <textarea
                                    id="formWhite"
                                    className="form-control"
                                    rows={9}
                                    style={{ border: "1px solid white", fontSize: "18px" }}
                                    onChange={(e) => setAnswer(e.target.value)}
                                >
                                </textarea>
                            </div>
                        </form>
                        <button className="btn btn-success" style={{ fontSize: "28px" }} onClick={checkAnswer}>Submit</button>
                    </>
            }
        </>
    )
}


export default function ERC(props) {
    const router = useRouter();
    let id = router.query.id;
    const [questionDetails, setQuestionDetails] = useState({});

    useEffect(() => {
        if (!id)
            return;
        getSubjectiveQuestion(id).then(res => setQuestionDetails(res));
    }, [id]);

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
        fontSize: "28px"
    };

    return (
        <div style={LayoutStyle} className="d-flex flex-column">
            <div className="d-flex justify-content-between flex-row" style={{ backgroundColor: "black", padding: "10px" }}>
                <Link href="/" style={{ color: "white", textDecoration: "underline" }}>Home</Link>
                {questionDetails ? "Subjective Question" : "loading..."}

                <span>
                    {questionDetails ?
                        <>1 / 1</>
                        : <>0 / 0</>
                    }

                </span>

            </div>
            <div className="d-flex flex-column justify-content-around align-items-center flex-fill p-5">
                {
                    questionDetails ?
                        <QALayout {...questionDetails} />
                        : <Loader />
                }
            </div>
        </div>
    )
}