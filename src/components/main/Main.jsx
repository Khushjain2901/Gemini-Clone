import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)


  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.profile} alt="Gemini Logo" />
        </div>
        <div className="main-container">
            {!showResult?
            <>
            <div className="greet">
                <p><span>Hello, Khush.</span></p>
                <p>How can I help you today?</p>
            </div>


            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to visit in India.</p>
                   < img src={assets.compass_icon} alt="message_icon" />
                </div>

                <div className="card">
                    <p>Briefly summarize the benefits of yoga.</p>
                   < img src={assets.bulb_icon} alt="message_icon" />
                </div>

                <div className="card">
                    <p>Brainstorm team bonding activities for our worker retreat.</p>
                   < img src={assets.message_icon} alt="message_icon" />
                </div>

                <div className="card">
                    <p>Improve the readibility of the following code.</p>
                   < img src={assets.code_icon} alt="message_icon" />
                </div>
            </div>
            </>
            :
            <div className="result">
                <div className="result-title">
                    <img className="result-profile"src={assets.profile} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading?
                <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                </div>   :
                    // <p dangerouslySetInnerHTML={{ __html: resultData }}></p>

                    // <p>{resultData}</p>
                     <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {resultData}
        </ReactMarkdown>
    </div>
                }
                    

                </div>
                
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                            onSent(input)
                        }
                    }}value={input} type="text" placeholder='Enter your prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="Gallery" />
                        <img src={assets.mic_icon} alt="Microphone" />
                        <img onClick={() => onSent(input)} src={assets.send_icon} alt="Send" />
                    </div>
                </div>
                <p className="bottom-info">Made with ❤️ by Khush</p>
                
            </div>

            
        </div>

    </div>
  )
}

export default Main