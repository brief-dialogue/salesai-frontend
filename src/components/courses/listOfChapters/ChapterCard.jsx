import { useRouter } from "next/router";
import styles from "./ChapterCard.module.css";

export default function ChapterCard({selected, id,name,onclickHandler}){
const router = useRouter();

return (
    <>
<div className={selected? styles.elevation:styles.notElevation}>
<button className="btn btn-light btn-lg  m-1 w-100" onClick={onclickHandler}>
<p className= {selected? "text-primary":"text-muted"} >{id} {name} </p>
</button>
</div>
</>)

}