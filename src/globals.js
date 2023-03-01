// stores all the global react states

const { useState } = require("react");


const useGlobalStore = () => {

    
    const [isLogIn,setIsLogin] = useState(false);

    return [isLogin,setIsLogin]

}


export default useGlobalStore
