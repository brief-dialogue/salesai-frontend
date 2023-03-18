
const getJsonFromUrl = async (url)=>{
    let res =  await fetch(url)
    .then(res=>res.json())
    .catch(err=>console.error(err));

    return res;
}


const getQuiz = async(quizId) => {

    const quizDetails = {
        "quizTitle": "",
        "quizSynopsis": "",
        "questionsCount": 0,
        "quizId": 0
    }

    let res = await getJsonFromUrl("http://localhost:1337/api/quizzes/1?populate=*");
    if(res){
        res = res.data;
        quizDetails.quizTitle = res.attributes.quizTitle;
        quizDetails.quizSynopsis = res.attributes.quizSynopsis;
        quizDetails.quizId = res.id;
        quizDetails.questionsCount = res.attributes.questions.data.length;
        return quizDetails;
    }
    return {err:"Something went wrong"};
}


const getQuestion = async (qusId) => {

    let res = await getJsonFromUrl("http://localhost:1337/api/quizzes/1?populate=*&populate=questions.answers&populate=questions.questionPic");
    if(res){
        res = res.data.attributes.questions.data[qusId];
        return {...res.attributes, qid:res.id-1}
    }
    return {err: "something went wrong"};
}

module.exports = { getQuiz,  getQuestion }
