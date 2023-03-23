import { useEffect, useState } from "react";
import NotLoggedIn from "../components/notLoggedIn";
import test_data from "../../public/test_data.json"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBProgress, MDBProgressBar, MDBRow, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane } from "mdb-react-ui-kit";
import Loader from "../components/loader";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, LineChart, CartesianGrid, Legend, Line, XAxis, YAxis } from "recharts";




function process_transcript(transcript_json) {

    let no_of_turns = transcript_json.messages.length;
    let no_of_turns_by_client = 0;
    let no_of_turns_by_employee = 0;
    let total_no_of_words = 0;
    let average_no_of_words = 0;
    let no_of_words_by_employee = 0;
    let no_of_words_by_client = 0;
    let average_no_of_words_by_employee = 0;
    let average_no_of_words_by_client = 0;
    let emotion_obj = {};
    let sentiment_obj = {};
    let question_ans = [];
    let segregated_text_by_sender = {}




    try {

        for (let message of transcript_json.messages) {

            if (message.isQuestion) {

                question_ans.push({

                    "question": message.question,
                    "text": message.text,
                    "expcted_ans": message.expcted_ans,
                    "ans": message.ans,
                    "ans_similarity": message.ans_similarity


                })
            }



            if (!(message.emotion in emotion_obj)) emotion_obj[message.emotion] = 1
            else {

                emotion_obj[message.emotion] += 1
            }

            if (!(message.sentiment in sentiment_obj)) sentiment_obj[message.sentiment] = 1
            else {

                sentiment_obj[message.sentiment] += 1
            }

            if (!(message.sender_id in segregated_text_by_sender)) segregated_text_by_sender[message.sender_id] = [message.text]
            else {

                segregated_text_by_sender[message.sender_id].push(message.text);
            }

            let temp_no_words = message.text.split(" ").length;


            total_no_of_words += temp_no_words;

            // check if employee or client , currently doing simple even or odd 
            // TODO -> add correct logic

            if (message.mid % 2 == 0) {

                // client
                no_of_turns_by_client += 1
                no_of_words_by_client += temp_no_words;
            }
            else {

                // employee
                no_of_turns_by_employee += 1
                no_of_words_by_employee += temp_no_words
            }



        }

        average_no_of_words = total_no_of_words / no_of_turns;
        if (no_of_turns_by_client != 0) average_no_of_words_by_client = no_of_words_by_client / no_of_turns_by_client;
        if (no_of_turns_by_employee != 0) average_no_of_words_by_employee = no_of_words_by_employee / no_of_turns_by_employee;

        return {

            no_of_turns,
            average_no_of_words,
            total_no_of_words,
            emotion_obj,
            sentiment_obj,
            question_ans,
            no_of_words_by_employee,
            no_of_words_by_client,
            no_of_turns_by_client,
            no_of_turns_by_employee,
            average_no_of_words_by_client,
            average_no_of_words_by_employee
        }




    }
    catch (err) {

        return false;
    }



}


// function ChatPreview({ chatData }) {

//     // data is the processed transcript according to the requirements

//     const [isLoading, setIsLoading] = useState(false);

//     console.log(chatData)



//     // setIsLoading(true);
//     let chat_element = (isLoading) ? (<Loader />) : (chatData.messages.map((message, index) => {

//         return (<p key={index} className="border border-primary square rounded-2 p-1">{message.text}</p>)
//     }))



//     // let chat_element = chatData.test_data.messages.map((message, index) => {

//     //     return (<p key = {index} className="border border-primary rounded-pill p-3" > {message}</p>);
//     // })

//     // if(isLoading) return (<Loader />)

//     return (

//         <MDBCard>
//             <MDBCardHeader>
//                 Chat Preview
//             </MDBCardHeader>
//             <MDBCardBody className="overflow-auto" style={{ maxHeight: "60vh" }}>
//                 {chat_element}
//             </MDBCardBody>
//         </MDBCard>

//     )




// }


// function ChatAnalysis({ chatData }) {


//     let processed_analytics = process_transcript(chatData);
//     let [count_no, setCountNo] = useState(1);

//     if (!processed_analytics) return <p> Some Error Occured</p>


//     let sumamary_analytics = (

//         <MDBCard id="summary_analytics">
//             <MDBCardHeader>
//                 Summary
//             </MDBCardHeader>
//             <MDBCardBody>
//                 <p><strong>No of Turns : </strong> {processed_analytics.no_of_turns}</p>
//                 <p><strong>Total No of Words : </strong> {processed_analytics.total_no_of_words}</p>
//                 <p><strong>Average No of Words per Message : </strong> {processed_analytics.average_no_of_words}</p>
//             </MDBCardBody>
//         </MDBCard>

//     )


//     // Emotion processing

//     const random_colors = ["red", "blue", "green", "grey", "pink", "yellow"]
//     const emotion_pie_data = [{ name: "a", value: 1 }]

//     for (let k of Object.keys(processed_analytics.emotion_obj)) {

//         let temp = { "name": k, "value": processed_analytics.emotion_obj[k] }
//         emotion_pie_data.push(temp)
//     }






//     let emotion_analytics = (


//         <MDBCard id="emotion_analytics">
//             <MDBCardHeader> Emotion Analysis </MDBCardHeader>
//             <MDBCardBody>
//                 <MDBRow>
//                     <MDBCol>
//                         <ResponsiveContainer width="80%" aspect={1}>
//                             <PieChart>
//                                 <Pie data={emotion_pie_data} dataKey="value" cx="50%" cy="50%" nameKey="name" fill="red" label>
//                                     {
//                                         emotion_pie_data.map((entry, index) => {

//                                             return (

//                                                 <Cell key={`cell-${index}`} fill={random_colors[index % 6]} />
//                                             )
//                                         })
//                                     }
//                                 </Pie>
//                                 <Tooltip />
//                             </PieChart>

//                         </ResponsiveContainer>

//                     </MDBCol>
//                     <MDBCol>
//                         {emotion_pie_data.map((entry, index) => {


//                             return (

//                                 <p key={`text-emotion-${index}`}><strong style={{ color: random_colors[index % 6] }}>{entry.name} : </strong>{entry.value}</p>
//                             )
//                         })}
//                     </MDBCol>


//                 </MDBRow>







//             </MDBCardBody>
//         </MDBCard>
//     )





//     // Sentiment processing

//     const sentiment_color = { "Neutral": "gray", "Positive": "green", "Negative": "red" }
//     const sentiment_name_map = { "NEU": "Neutral", "POS": "Positive", "NEG": "Negative" }
//     const sentiment_pie_data = []

//     for (let k of Object.keys(processed_analytics.sentiment_obj)) {

//         let temp = { "name": sentiment_name_map[k], "value": processed_analytics.sentiment_obj[k] }
//         sentiment_pie_data.push(temp)
//     }


//     let sentiment_analytics = (


//         <MDBCard id="sentiment_analytics">
//             <MDBCardHeader> Sentiment Analysis </MDBCardHeader>
//             <MDBCardBody>
//                 <MDBRow>
//                     <MDBCol>
//                         <ResponsiveContainer width="80%" aspect={1}>
//                             <PieChart>
//                                 <Pie data={sentiment_pie_data} dataKey="value" cx="50%" cy="50%" nameKey="name" fill="red" label>
//                                     {
//                                         sentiment_pie_data.map((entry, index) => {

//                                             return (

//                                                 <Cell key={`cell-${index}`} fill={sentiment_color[entry.name]} />
//                                             )
//                                         })
//                                     }
//                                 </Pie>
//                                 <Tooltip />
//                             </PieChart>

//                         </ResponsiveContainer>

//                     </MDBCol>
//                     <MDBCol>
//                         {sentiment_pie_data.map((entry, index) => {

//                             return (

//                                 <p key={`text-emotion-${index}`}><strong style={{ color: sentiment_color[entry.name] }}>{entry.name} : </strong>{entry.value}</p>
//                             )
//                         })}
//                     </MDBCol>


//                 </MDBRow>

//             </MDBCardBody>
//         </MDBCard>
//     )


//     //  erc


//     let expected_response_preview = (

//         <MDBCard id="expected_response_preview">
//             <MDBCardHeader>
//                 Expected Response
//             </MDBCardHeader>
//             <MDBCardBody>
//                 <MDBRow>
//                     <MDBBtn onClick={() => { console.log(count_no); setCountNo(++count_no) }}></MDBBtn>
//                     <p>Count is {count_no}</p>
//                 </MDBRow>

//             </MDBCardBody>

//         </MDBCard>
//     )




//     return (
//         <>
//             <MDBRow>
//                 <MDBCol>
//                     {sumamary_analytics}
//                 </MDBCol>
//             </MDBRow>

//             <MDBRow className="mt-3">
//                 <MDBCol>
//                     {emotion_analytics}
//                 </MDBCol>

//             </MDBRow>

//             <MDBRow className="mt-3">
//                 <MDBCol>
//                     {sentiment_analytics}
//                 </MDBCol>

//             </MDBRow>

//             <MDBRow className="mt-3">
//                 <MDBCol>
//                     {expected_response_preview}
//                 </MDBCol>

//             </MDBRow>


//         </>

//     )





// }

function ChatPreview({ chatData }) {

    console.log("preview",chatData)
    const [chats,setChats] = useState(chatData) 


    return (<> <p> This is chat preview </p></>)


}


function ExpectedResponseChecker({ questionData }) {


    const [verticalActive, setVerticalActive] = useState(0);
    const [tabContent, setTabContent] = useState(questionData[verticalActive])

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }

        setVerticalActive(value);
        setTabContent(questionData[value]);
    };

    console.log(questionData)


    return (

        <MDBCard>
            <MDBCardHeader>
                Expected Response Analysis
            </MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol size='3'>
                        <MDBTabs className='flex-column text-center'>


                            {
                                questionData.map((el, index) => {

                                    return (

                                        <MDBTabsItem key={`q{index}`}>
                                            <MDBTabsLink onClick={() => handleVerticalClick(0)} active={verticalActive === index}>
                                                {el.question}
                                            </MDBTabsLink>
                                        </MDBTabsItem>

                                    )
                                })
                            }


                        </MDBTabs>
                    </MDBCol>
                    <MDBCol size='9'>
                        <MDBTabsContent>
                            <MDBTabsPane show={true}>

                                <MDBRow className="mb-3">
                                    <MDBCol className="text-center">
                                        Similarity Score :  <span> {tabContent.ans_similarity * 100}% </span>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className="text-center">

                                    <MDBCol>

                                        <p> Your Response</p>
                                        <p> {tabContent.ans}</p>

                                    </MDBCol>


                                    <MDBCol>

                                        <p> Expected Response</p>
                                        <p> {tabContent.expcted_ans}</p>
                                    </MDBCol>


                                </MDBRow>



                            </MDBTabsPane>
                        </MDBTabsContent>
                    </MDBCol>
                </MDBRow>

            </MDBCardBody>

        </MDBCard>
    )



}
const data = [
    {
      name: 0,
      uv: "positive" ,
      pv: 1,
      amt: "positive",
    },
    {
      name:1,
      uv: "negative",
      pv: 1,
      amt: 'negative',
    },
    {
      name:2,
      uv: "neutral",
      pv: 2,
      amt: "neutral",
    },
    {
      name:3,
      uv: "neutral" ,
      pv: 1,
      amt: "positive",
    },
  ];


  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;
  
    if (value > 2500) {
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
          <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
        </svg>
      );
    }
  
    return (
      <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
        <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
      </svg>
    );
  };

function SentimentLineChart({ chatData }) {


    // console.log("Sentiment Chart Data",chatData)
    // const [data,setData] = useState({});

    // useEffect(()=>{




    // },[])



    return (

        <MDBCard>
            <MDBCardHeader>
                Sentiment Line Chart
            </MDBCardHeader>
            <MDBCardBody>
                <ResponsiveContainer width="100%" aspect={3}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={<CustomizedDot />} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </MDBCardBody>
        </MDBCard>
    )
}


function ChatAnalysis({ chatData }) {


    if (Object.keys(chatData).length == 0) return <p> No Data to Show</p>


    let summary_analytics = (

        <MDBCard id="summary_analytics">
            <MDBCardHeader>
                Summary
            </MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol>
                        <p><strong>Total No of Turns : </strong> {chatData.no_of_turns}</p>
                        <p><strong>No of Turns (By Employee) : </strong> {chatData.no_of_turns_by_employee}</p>
                        <p><strong>No of Turns (By Client) : </strong> {chatData.no_of_turns_by_client}</p>

                    </MDBCol>
                    <MDBCol>
                        <p><strong>Total No of Words : </strong> {chatData.total_no_of_words}</p>
                        <p><strong>No of Words (By Employee) : </strong> {chatData.no_of_words_by_employee}</p>
                        <p><strong>No of Words (By Client) : </strong> {chatData.no_of_words_by_client}</p>

                    </MDBCol>
                    <MDBCol>
                        <p><strong>Average No of Words per Message : </strong> {chatData.average_no_of_words.toFixed(2)}</p>
                        <p><strong>No of Words per Message (By Employee) : </strong> {chatData.average_no_of_words_by_employee.toFixed(2)}</p>
                        <p><strong>No of Words per Message (By Client) : </strong> {chatData.average_no_of_words_by_client.toFixed(2)}</p>

                    </MDBCol>
                </MDBRow>


            </MDBCardBody>
        </MDBCard>

    )


    // Emotion processing

    const random_colors = ["red", "blue", "green", "grey", "pink", "yellow"]
    const emotion_pie_data = [{ name: "a", value: 1 }]

    for (let k of Object.keys(chatData.emotion_obj)) {

        let temp = { "name": k, "value": chatData.emotion_obj[k] }
        emotion_pie_data.push(temp)
    }

    let emotion_analytics = (


        <MDBCard id="emotion_analytics">
            <MDBCardHeader> Emotion Analysis </MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol>
                        <ResponsiveContainer width="80%" aspect={1}>
                            <PieChart>
                                <Pie data={emotion_pie_data} dataKey="value" cx="50%" cy="50%" nameKey="name" fill="red" label>
                                    {
                                        emotion_pie_data.map((entry, index) => {

                                            return (

                                                <Cell key={`cell-${index}`} fill={random_colors[index % 6]} />
                                            )
                                        })
                                    }
                                </Pie>
                                <Tooltip />
                            </PieChart>

                        </ResponsiveContainer>

                    </MDBCol>
                    <MDBCol>
                        {emotion_pie_data.map((entry, index) => {

                            return (

                                <p key={`text-emotion-${index}`}><strong style={{ color: random_colors[index % 6] }}>{entry.name} : </strong>{entry.value}</p>
                            )
                        })}
                    </MDBCol>

                </MDBRow>

            </MDBCardBody>
        </MDBCard>
    )


    // Sentiment processing

    const sentiment_color = { "Neutral": "gray", "Positive": "green", "Negative": "red" }
    const sentiment_name_map = { "NEU": "Neutral", "POS": "Positive", "NEG": "Negative" }
    const sentiment_pie_data = []

    for (let k of Object.keys(chatData.sentiment_obj)) {

        let temp = { "name": sentiment_name_map[k], "value": chatData.sentiment_obj[k] }
        sentiment_pie_data.push(temp)
    }


    let sentiment_analytics = (


        <MDBCard id="sentiment_analytics">
            <MDBCardHeader> Sentiment Analysis </MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol>
                        <ResponsiveContainer width="80%" aspect={1}>
                            <PieChart>
                                <Pie data={sentiment_pie_data} dataKey="value" cx="50%" cy="50%" nameKey="name" fill="red" label>
                                    {
                                        sentiment_pie_data.map((entry, index) => {

                                            return (
                                                <Cell key={`cell-${index}`} fill={sentiment_color[entry.name]} />
                                            )
                                        })
                                    }
                                </Pie>
                                <Tooltip />
                            </PieChart>

                        </ResponsiveContainer>

                    </MDBCol>
                    <MDBCol>
                        {sentiment_pie_data.map((entry, index) => {

                            return (

                                <p key={`text-emotion-${index}`}><strong style={{ color: sentiment_color[entry.name] }}>{entry.name} : </strong>{entry.value}</p>
                            )
                        })}
                    </MDBCol>


                </MDBRow>

            </MDBCardBody>
        </MDBCard>
    )









    return (
        <>

            <MDBRow className="mb-3">
                <MDBCol>
                    {summary_analytics}
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
                <MDBCol>
                    {emotion_analytics}
                </MDBCol>
                <MDBCol>
                    {sentiment_analytics}
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
                <MDBCol>
                    <ExpectedResponseChecker questionData={chatData.question_ans} />
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <SentimentLineChart chatData={test_data} />
                </MDBCol>
            </MDBRow>
            

        </>
    )



}



export default function ChatAnalyzer({ loginStatus, setLoginStatus, user, setUser }) {


    const [basicActive, setBasicActive] = useState('Analysis');
    const [processedChatData, setProcessedChatData] = useState({})
    const [isLoading, setIsLoading] = useState(true);


    // todo -> add referesh data functionlaity here
    useEffect(() => {

        let temp = process_transcript(test_data);
        setProcessedChatData(temp);
        setIsLoading(false);

        console.log("Processed chat data", temp)

    }, [])



    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };



    if (!user['isLogIn']) {
        return (<NotLoggedIn />);
    }

    // Only for testing
    // TODO - complete integration



    console.log(test_data);



    return (

        <>

            <MDBContainer className="m-5">

                <MDBTabs className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('Preview')} active={basicActive === 'Preview'}>
                            Preview
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('Analysis')} active={basicActive === 'Analysis'}>
                            Analysis
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane show={basicActive === 'Preview'}> {(isLoading) ? <Loader /> : <ChatPreview chatData={test_data} />} </MDBTabsPane>
                    <MDBTabsPane show={basicActive === 'Analysis'}> {(isLoading) ? <Loader /> : <ChatAnalysis chatData={processedChatData} />} </MDBTabsPane>
                </MDBTabsContent>


            </MDBContainer>

        </>

    )

}