import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import '../Main/main.css'
import { Context } from '../../Context/context'

function Main() {
    const {onSent,recentPrompts,showResult,loading,resultData,setInput,input}=useContext(Context)


  return (
    <div className="main">
        <div className="nav">
            <p>
                Gemini
            </p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult
            ?<>

            <div className="greet">
                <p><span>Hello, Shanu.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to chill</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize the concept:React</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstrom activities at office.</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Basic python codes</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            : <div className='result'>

            </div>
            
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value= {input} type="text" placeholder='Enter a Prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, so double check the sources.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
