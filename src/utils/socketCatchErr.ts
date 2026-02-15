export const catchSocketError = (fn : Function) : void => {
    try {fn()} catch(error) {console.error("socket error : ",error || "unknow error")}
}

