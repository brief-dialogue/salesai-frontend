

export default function Question(props) {


    let QAstyle = {
        height: "100%"
    }

    return (
        <>
            <div style={QAstyle} className="d-flex flex-column justify-content-around align-items-center flex-fill m-3">
                <div className="question flex-fill d-flex align-items-center flex-column justify-content-center">
                    {props.question}
                    {props.questionPic.data && <img className="mt-3" height="450px" src={props.questionPic.data.attributes.url} />}
                </div>
                <div style={{ backgroundColor: "rgba(0,0,0,.5)", width: "100%" }} className="d-flex justify-content-around align-items-center flex-wrap flex-fill m-4">
                    {
                        props.answers.map((answer, answerId) =>
                            <button
                                className="btn btn-primary"
                                style={{ fontSize: "28px" }}
                                key={answerId}
                                onClick={() => props.selectAnswer(answerId + 1)}
                            >
                                {answer.answer}
                            </button>
                        )
                    }

                </div>
            </div>
        </>
    );
}

