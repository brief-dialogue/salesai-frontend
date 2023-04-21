import {ANALYSIS_URL, BASE_STRAPI_URL} from "../../environment"

export let quizUrl = (id)=>BASE_STRAPI_URL + `/quizzes/${id}?&populate=*`;

export let questionUrl = (id)=>BASE_STRAPI_URL+`/quizzes/${id}?populate=*&populate=questions.answers&populate=questions.questionPic`;

export let subjectiveQuestionUrl = (id)=> BASE_STRAPI_URL+`/subjective-questions/${id}`;

export let ERCUrl = ()=> ANALYSIS_URL+`/erc`

export let chapterUrl = (id)=> BASE_STRAPI_URL+`/chapters/${id}`;

export let courseDetailesUrl = (id)=> BASE_STRAPI_URL +`/courses/${id}?fields[0]=title&populate[chapters][fields][0]=heading`;

export let ListOfCourseUrl =(id)=> BASE_STRAPI_URL + `/courses?&populate[thumbnail][fields][0]=url`;

export let ListOfCourseFilterUrl =(query) =>BASE_STRAPI_URL + `/courses?filters[title][$containsi]=${query.trim()}&populate[thumbnail][fields][0]=url`;