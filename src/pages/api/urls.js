import {BASE_STRAPI_URL} from "../../environment"

export let quizUrl = (id)=>BASE_STRAPI_URL + `/quizzes/${id}?&populate=*`;

export let questionUrl = (id)=>BASE_STRAPI_URL+`/quizzes/${id}?populate=*&populate=questions.answers&populate=questions.questionPic`;

