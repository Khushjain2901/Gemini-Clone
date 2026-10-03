import { createContext, useState } from "react";
import { run } from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  //   const handleSubmit = async () => {
  //     const result = await run(input);
  //     console.log(result);
  //   };

  //    handleSubmit();

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    const finalPrompt = prompt?.trim() || input.trim();
    if (!finalPrompt) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(finalPrompt);
    setPrevPrompts((prev) => [finalPrompt, ...prev]);

    const response = await run(finalPrompt);

    // let responseArray=response.split("**");
    // let newResponse;
    // for(let i=0;i<responseArray.length;i++){
    //     if(i===0 || i%2!==1){
    //         newResponse += responseArray[i];
    //     }
    //     else{
    //         newResponse += "<b>"+responseArray[i]+"</b>"
    //     }
    // };

    // let newResponse2=newResponse.split("*").join("</br>");

    let responseArray = response.split(" ");
    for (let i = 0; i < responseArray.length; i++) {
      const nextWord = responseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  // onSent("what is react js?")

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
