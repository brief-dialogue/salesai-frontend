import {questionUrl, quizUrl} from "./urls"

const getJsonFromUrl = async (url)=>{
    let res =  await fetch(url)
    .then(res=>res.json())
    .catch(err=>console.error(err));

    return res;
}

export const getQuiz = async(quizId) => {

    const quizDetails = {
        "quizTitle": "",
        "quizSynopsis": "",
        "questionsCount": 0,
        "quizId": 0
    }
    
    let res = await getJsonFromUrl(quizUrl(quizId));
    if(res.data){
        res = res.data;
        quizDetails.quizTitle = res.attributes.quizTitle;
        quizDetails.quizSynopsis = res.attributes.quizSynopsis;
        quizDetails.quizId = res.id;
        quizDetails.questionsCount = res.attributes.questions.data.length;
        return quizDetails;
    }
    return {err:"Something went wrong"};
}

export const getQuestion = async (quizId, qusId) => {

    let res = await getJsonFromUrl(questionUrl(quizId));

    if(res.data != null){
        res = res.data.attributes.questions.data[qusId];
        return {...res.attributes, qid:res.id-1}
    }
    return {err: "something went wrong"};
}


