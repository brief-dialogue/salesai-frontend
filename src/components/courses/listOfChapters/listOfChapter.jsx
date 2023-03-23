import React from "react";
import ChapterCard from "./ChapterCard";
import { useState } from "react";
export default function ListOfChapter({currentChapter,chapterList,updatedChapter}){
 
const rows = [];
for (let i = 0; i < chapterList.length; i++) {
    rows.push(<ChapterCard key={chapterList[i].id} 
      id={chapterList[i].id}
      name={chapterList[i].attributes.heading}
      selected={currentChapter==i+1 ?true:false}
      onclickHandler={()=>updatedChapter(i)} />);
}
  return (
<div className="m-1">{rows}</div>

  );
};

