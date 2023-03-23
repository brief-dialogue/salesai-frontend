import {ANALYSIS_URL, BASE_STRAPI_URL} from "../../environment"

export let quizUrl = (id)=>BASE_STRAPI_URL + `/quizzes/${id}?&populate=*`;

export let questionUrl = (id)=>BASE_STRAPI_URL+`/quizzes/${id}?populate=*&populate=questions.answers&populate=questions.questionPic`;

export let subjectiveQuestionUrl = (id)=> BASE_STRAPI_URL+`/subjective-questions/${id}`;

export let ERCUrl = ()=> ANALYSIS_URL+`/erc`