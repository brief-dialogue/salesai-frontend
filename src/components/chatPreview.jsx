import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCol, MDBRow, MDBTextArea } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import Loader from "./loader";


const filterPillTextKeys = { "POS": "Positive 😊", "NEG": "Negative 😒", "NEU": "Neutral 😐", "employee": "employee", "client": "client", "joy": "joy 😂", others: "others 😵‍💫", surprise: "surprise 😮", disgust: "disgust 🤢", sadness: "sadness 😔", fear: "fear 😨", anger: "anger 😡" }

function ChatPill({ messageObj, direction }) {



    return (

        <MDBRow className={`d-flex flex-row-${(direction == "left") ? "" : "reverse"}`}>
            <MDBCard style={{ width: "fit-content", maxWidth: "70%" }} border={(direction == "left") ? "primary" : "secondary"} className="rounded-9 mb-3">
                <MDBCardBody>
                    {messageObj.text}
                </MDBCardBody>
                <MDBCardFooter>

                    <MDBBtn outline rounded color="secondary" className="m-1">
                        {filterPillTextKeys[messageObj.sentiment]}
                    </MDBBtn>

                    <MDBBtn outline rounded color="secondary" className="m-1">
                        {filterPillTextKeys[messageObj.emotion]}
                    </MDBBtn>


                </MDBCardFooter>
            </MDBCard>

        </MDBRow>




    )

}

function ChatBox({ chatData, setTextData }) {


    function handleCopy() {

        let message = "";

        for (let el of chatData) {

            message += el.text;
        }


        message = message.replaceAll(/(\r\n|\n|\r)/gm, "");
        message = message.replaceAll(/"/g, "'")
        setTextData(message);


    }

    return (
        <MDBCard>
            <MDBCardHeader>
                <strong>Chats</strong>
                <MDBBtn size="sm" className="float-end" onClick={handleCopy}> Copy</MDBBtn>
            </MDBCardHeader>
            <MDBCardBody style={{ maxHeight: "90vh" }} className="overflow-auto">

                {chatData.map((message, index) => {
                    return (
                        <ChatPill key={`m${index}`} messageObj={message} direction={(index % 2 == 0) ? "right" : "left"} />
                    )
                })}
            </MDBCardBody>
        </MDBCard>
    )

}

function TextAnalytics({ textData, setTextData }) {


    const [isLoading, setIsLoading] = useState(false);
    const [NERObj, setNERObj] = useState({});
    const [keywords, setKeyWords] = useState({});


    function handleSubmit() {

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '08f8f57e41msh9f19c56c39d085fp19e746jsnc6a668ceeeca',
                'X-RapidAPI-Host': 'named-entity-extraction1.p.rapidapi.com'
            },
            body: `{"extractor":"en","text":"${textData}"}`
        };

        setIsLoading(true);

        fetch('https://named-entity-extraction1.p.rapidapi.com/api/lingo', options)
            .then(response => response.json())
            .then(response => {

                setIsLoading(false);
                setNERObj(response.result);
                console.log(response)

            })
            .catch(err => console.error(err));


        setIsLoading(true);
        const options1 = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '08f8f57e41msh9f19c56c39d085fp19e746jsnc6a668ceeeca',
                'X-RapidAPI-Host': 'keyword-extractor.p.rapidapi.com'
            },
            body: `{"text":"${textData}","top_n":20,"ngram_range":[1,2],"diversify":true,"diversity":0}`
        };

        fetch('https://keyword-extractor.p.rapidapi.com/api/keyword', options1)
            .then(response => response.json())
            .then(response => {

                setIsLoading(false);
                setKeyWords(response.result);
                console.log(response);
            })
            .catch(err => console.error(err));

    }

    return (

        <>
            <MDBTextArea label='Message' id='textAreaExample' rows={8} value={textData} onChange={e => setTextData(e.target.value)} />
            <MDBBtn block onClick={handleSubmit} className="mt-2 mb-2">{(isLoading) ? <Loader /> : "Submit"}</MDBBtn>

            <p>Result Preview</p>
            {Object.keys(NERObj).map((k, index) => {

                return (
                    <p key={`tt${index}`}> {k} : {NERObj[k].replaceAll(";", " ")}</p>
                )

            })}
            <p>Key Words</p>
            {Object.keys(keywords).map((k, index) => {

                return (
                    <p key={`tt${index}`}> {k} : {keywords[k].replaceAll(";", " ")}</p>
                )

            })}
        </>




    )

}


export default function ChatPreview({ chatData }) {



    console.log("preview", chatData)

    const filterSentimentDefault = { "POS": false, "NEG": false, "NEU": false }
    const filterEmotionDefault = { joy: false, others: false, surprise: false, disgust: false, sadness: false, fear: false, anger: false }
    const filterUserDefault = { employee: true, client: true }

    // const filterPillTextKeys = {"POS":"Positive 😊","NEG":"Negative 😒","NEU":"Neutral 😐","employee":"employee","client":"client","joy":"joy 😂", others:"others 😵‍💫", surprise:"surprise 😮", disgust:"disgust 🤢", sadness:"sadness 😔", fear:"fear 😨",anger:"anger 😡"}


    const [filterSentiment, setFilterSentiment] = useState(filterSentimentDefault);
    const [filterEmotion, setFilterEmotion] = useState(filterEmotionDefault);
    const [filterUser, setFilterUser] = useState(filterUserDefault);
    const [textData, setTextData] = useState("");
    const [chats, setChats] = useState(chatData.messages)

    useEffect(() => {


        let res = chatData.messages.filter((el, index) => {


            let isClient = index % 2 == 0;
            let isEmployee = index % 2 == 1;
            let bool_user = false;
            if (isClient && filterUser["client"]) bool_user = true;
            if (isEmployee && filterUser["employee"]) bool_user = true;

            return bool_user;
        })

        let hasClickedSentiment = false;
        let hasClickedEmotion = false;

        for (let k of Object.keys(filterEmotion)) hasClickedEmotion = hasClickedEmotion || filterEmotion[k];
        for (let k of Object.keys(filterSentiment)) hasClickedSentiment = hasClickedSentiment || filterSentiment[k];

        if (hasClickedEmotion || hasClickedSentiment) {

            res = res.filter((el, index) => {

                return (filterEmotion[el.emotion] || filterSentiment[el.sentiment])
            })
        }


        setChats(res);



    }, [filterSentiment, filterEmotion, filterUser, chatData])



    function reset() {

        setFilterEmotion(filterEmotionDefault);
        setFilterSentiment(filterSentimentDefault);
        setFilterUser(filterUserDefault);
        setChats(chatData.messages);


    }

    // function filter(){



    //     let res = chatData.messages.filter((el,index)=>{

    //         if(filterUser["employee"] && filterUser["client"]) return true;
    //         else if(filterUser["employee"] && !filterUser["client"]) return (index%2 == 1);
    //         else if(!filterUser["employee"] && filterUser["client"]) return (index%2 == 0);
    //         else return false;            
    //     })

    //     setChats(res);


    // }

    function handleFilterClick(majorKey, minorKey) {


        if (majorKey)

            if (majorKey == "user") setFilterUser({ ...filterUser, [minorKey]: !filterUser[minorKey] })
            else if (majorKey == "sentiment") setFilterSentiment({ ...filterSentiment, [minorKey]: !filterSentiment[minorKey] })
            else if (majorKey == "emotion") setFilterEmotion({ ...filterEmotion, [minorKey]: !filterEmotion[minorKey] })


        // filter();


    }



    return (<>

        <MDBRow>
            <MDBCol size="3" className="text-center">

                <p className="fw-bolder text-start"> Filters  <MDBBtn className="float-end" size="sm" onClick={reset}>Reset</MDBBtn></p>
                <hr />

                <p className="text-secondary  fs-6 fst-italic"> User</p>
                {Object.keys(filterUserDefault).map((k, index) => {

                    return (
                        <MDBBtn key={k} outline={!filterUser[k]} rounded color={(filterUser[k]) ? "success" : "secondary"} className="m-1" onClick={() => { handleFilterClick("user", k) }}>
                            {filterPillTextKeys[k]}
                        </MDBBtn>
                    )
                })}
                <hr />
                <p className="text-secondary  fs-6 fst-italic"> Sentiment</p>
                {Object.keys(filterSentimentDefault).map((k, index) => {

                    return (
                        <MDBBtn key={k} outline={!filterSentiment[k]} rounded color={(filterSentiment[k]) ? "success" : "secondary"} className="m-1" onClick={() => { handleFilterClick("sentiment", k) }} >
                            {filterPillTextKeys[k]}
                        </MDBBtn>
                    )
                })}
                <hr />
                <p className="text-secondary  fs-6 fst-italic"> Emotions</p>
                {Object.keys(filterEmotionDefault).map((k, index) => {

                    return (
                        <MDBBtn key={k} outline={!filterEmotion[k]} rounded color={(filterEmotion[k]) ? "success" : "secondary"} className="m-1" onClick={() => { handleFilterClick("emotion", k) }}>
                            {filterPillTextKeys[k]}
                        </MDBBtn>
                    )
                })}



                {/* 
                {Object.keys(filterPillTextKeys).map((k, index) => {

                    return (

                        <MDBBtn key={k} outline rounded color="secondary" className="m-1">
                            {filterPillTextKeys[k]}
                        </MDBBtn>
                    )
                })} */}


            </MDBCol>

            <MDBCol size="5">
                <ChatBox chatData={chats} setTextData={setTextData} />
            </MDBCol>

            <MDBCol size="4">
                <TextAnalytics textData={textData} setTextData={setTextData} />
            </MDBCol>



        </MDBRow>

    </>)



}