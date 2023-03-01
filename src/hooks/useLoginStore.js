import { useState } from "react"

const useLoginStore = ()=>{


    const [isLogIn,setIsLogIn] = useState(false);
    

    return [isLogIn,setIsLogIn];
}


export default useLoginStore;