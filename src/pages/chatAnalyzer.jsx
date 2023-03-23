import { useEffect, useState } from "react";
import NotLoggedIn from "../components/notLoggedIn";
import test_data from "../../public/test_data.json"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Loader from "../components/loader";
import { Pie, PieChart, ResponsiveContainer,Tooltip,Cell } from "recharts";




function process_transcript(transcript_json) {

    let no_of_turns = transcript_json.messages.length;
    let total_no_of_words = 0
    let average_no_of_words = 0
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

            total_no_of_words += message.text.split(" ").length;


        }

        average_no_of_words = total_no_of_words/no_of_turns;

        return {

            no_of_turns,average_no_of_words,total_no_of_words,emotion_obj,sentiment_obj,question_ans
        }




    }
    catch (err) {

        return false;
    }



}


function ChatPreview({ chatData }) {

    // data is the processed transcript according to the requirements

    const [isLoading, setIsLoading] = useState(false);

    console.log(chatData)



    // setIsLoading(true);
    let chat_element = (isLoading) ? (<Loader />) : (chatData.messages.map((message, index) => {

        return (<p key={index} className="border border-primary square rounded-2 p-1">{message.text}</p>)
    }))



    // let chat_element = chatData.test_data.messages.map((message, index) => {

    //     return (<p key = {index} className="border border-primary rounded-pill p-3" > {message}</p>);
    // })

    // if(isLoading) return (<Loader />)

    return (
    
    <MDBCard>
        <MDBCardHeader>
            Chat Preview
        </MDBCardHeader>
        <MDBCardBody className="overflow-auto" style={{ maxHeight: "60vh" }}>
            {chat_element}
        </MDBCardBody>
    </MDBCard>
    
    )




}


function ChatAnalysis({chatData}){

    
    let processed_analytics = process_transcript(chatData);
    let [count_no,setCountNo] = useState(1);
    
    if(!processed_analytics) return <p> Some Error Occured</p>


    let sumamary_analytics = (

        <MDBCard id="summary_analytics">
            <MDBCardHeader>
                Summary
            </MDBCardHeader>
            <MDBCardBody>
                <p><strong>No of Turns : </strong> {processed_analytics.no_of_turns}</p>
                <p><strong>Total No of Words : </strong> {processed_analytics.total_no_of_words}</p>
                <p><strong>Average No of Words per Message : </strong> {processed_analytics.average_no_of_words}</p>
            </MDBCardBody>
        </MDBCard>

    )


    // Emotion processing

    const random_colors = ["red","blue","green","grey","pink","yellow"]
    const emotion_pie_data = [{name:"a",value:1}]
    
    for(let k of Object.keys(processed_analytics.emotion_obj)){

        let temp = {"name":k,"value":processed_analytics.emotion_obj[k]}
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
                        emotion_pie_data.map((entry,index)=>{

                            return (

                                <Cell key={`cell-${index}`}  fill={random_colors[index%6]}/>
                            )
                        })
                    }
                    </Pie>
                    <Tooltip />
                </PieChart>

            </ResponsiveContainer>

            </MDBCol>
            <MDBCol>
                {emotion_pie_data.map((entry,index)=>{


                    return(

                        <p key={`text-emotion-${index}`}><strong style={{color:random_colors[index%6]}}>{entry.name} : </strong>{entry.value}</p>
                    )
                })}
            </MDBCol>


            </MDBRow>







            </MDBCardBody>
        </MDBCard>
    )




    
    // Emotion processing

    const sentiment_color = {"Neutral":"gray","Positive":"green","Negative":"red"}
    const sentiment_name_map = {"NEU":"Neutral" , "POS":"Positive","NEG":"Negative"}
    const sentiment_pie_data = []
    
    for(let k of Object.keys(processed_analytics.sentiment_obj)){

        let temp = {"name":sentiment_name_map[k],"value":processed_analytics.sentiment_obj[k]}
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
                        sentiment_pie_data.map((entry,index)=>{

                            return (

                                <Cell key={`cell-${index}`}  fill={sentiment_color[entry.name]}/>
                            )
                        })
                    }
                    </Pie>
                    <Tooltip />
                </PieChart>

            </ResponsiveContainer>

            </MDBCol>
            <MDBCol>
                {sentiment_pie_data.map((entry,index)=>{

                    return(

                        <p key={`text-emotion-${index}`}><strong style={{color:sentiment_color[entry.name]}}>{entry.name} : </strong>{entry.value}</p>
                    )
                })}
            </MDBCol>


            </MDBRow>

            </MDBCardBody>
        </MDBCard>
    )
    

    //  erc
    

    let expected_response_preview = (

        <MDBCard id="expected_response_preview">
            <MDBCardHeader>
                Expected Response 
            </MDBCardHeader>
            <MDBCardBody>
            <MDBRow>
                <MDBBtn onClick={()=>{console.log(count_no);setCountNo(++count_no)}}></MDBBtn>
                <p>Count is {count_no}</p>
            </MDBRow>
                
            </MDBCardBody>

        </MDBCard>
    ) 

    


    return(
        <>
        <MDBRow>
            <MDBCol>
                {sumamary_analytics}
            </MDBCol>
        </MDBRow>

        <MDBRow className="mt-3">
            <MDBCol>
                {emotion_analytics}
            </MDBCol>

        </MDBRow>

        <MDBRow className="mt-3">
            <MDBCol>
                {sentiment_analytics}
            </MDBCol>

        </MDBRow>

        <MDBRow className="mt-3">
            <MDBCol>
                {expected_response_preview}
            </MDBCol>

        </MDBRow>


        </>

    )

    



}



export default function ChatAnalyzer({ loginStatus, setLoginStatus, user, setUser }) {



    if (!user['isLogIn']) {
        return (<NotLoggedIn />);
    }

    // Only for testing
    // TODO - complete integration


    console.log(test_data);



    return (

        <>

            <MDBContainer className="m-5">

                <MDBRow>
                    {/* Message Preview */}
                    <MDBCol className="col-3">
                        <ChatPreview chatData={test_data} />
                    </MDBCol>

                    <MDBCol className="col-9">

                        <MDBCard>
                            <MDBCardHeader>
                                Analysis
                            </MDBCardHeader>
                            <MDBCardBody>
                                <ChatAnalysis chatData={test_data} />
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>



            </MDBContainer>

        </>

    )

}