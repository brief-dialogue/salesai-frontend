import { ERCUrl, questionUrl, quizUrl, subjectiveQuestionUrl } from "./urls"

const getJsonFromUrl = async (url) => {
    let res = await fetch(url)
        .then(res => res.json())
        .catch(err => console.error(err));

    return res;
}

const postToUrl = async (url, body) => {
    let res = fetch(url, {
        method: "post",
        mode: 'cors',
        headers: {
            "Accept": "*/*",
            'Access-Control-Allow-Origin': "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .catch(err => console.log(err));

    return res;
}

export const getQuiz = async (quizId) => {

    const quizDetails = {
        "quizTitle": "",
        "quizSynopsis": "",
        "questionsCount": 0,
        "quizId": 0
    }

    let res = await getJsonFromUrl(quizUrl(quizId));
    if (res.data) {
        res = res.data;
        quizDetails.quizTitle = res.attributes.quizTitle;
        quizDetails.quizSynopsis = res.attributes.quizSynopsis;
        quizDetails.quizId = res.id;
        quizDetails.questionsCount = res.attributes.questions.data.length;
        return quizDetails;
    }
    return { err: "Something went wrong" };
}

export const getQuestion = async (quizId, qusId) => {

    let res = await getJsonFromUrl(questionUrl(quizId));

    if (res.data != null) {
        res = res.data.attributes.questions.data[qusId];
        return { ...res.attributes, qid: res.id - 1 }
    }
    return { err: "something went wrong" };
}

export const getSubjectiveQuestion = async (id) => {
    let res = await getJsonFromUrl(subjectiveQuestionUrl(id));

    if (res.data) {
        return { id: res.data.id, ...res.data.attributes }
    }
    return { err: "something went wrong" };
}

export const getAnalysis = async (expectedAnswer, answer) => {
    let res = await postToUrl(ERCUrl(), {"answer": answer, "expectedAns": expectedAnswer});

    if(res != null){
        return res;
    }
    return {err:"something went wrong"};
}

export function getRandomColor() {
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    let colors = ['#000000', '#36454F', '#023020', '#301934', '#343434', '#1B1212', '#28282B', '#191970', '#353935']
    return colors[Math.floor(Math.random() * colors.length)];
}

