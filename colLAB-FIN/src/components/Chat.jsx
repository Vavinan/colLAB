import React, { useContext,useState } from 'react'
import addicon from "../images/addicon.png"
import cam from "../images/cam.png"
import more from "../images/more.png"
import Messages from './Messages'
import InputMessages from "./InputMessages"
import { ChatContext } from '../context/ChatContext'
import Posts from '../pages/Posts'
import { ShowBio } from './ShowBio'
//import { AuthContext } from '../context/AuthContext'
const Chat = () => {

  const {data} = useContext(ChatContext);
  //console.log(data.user?.uid)
  const [showPosts, setShowPosts] = useState(false);
  const [showBioPopup, setShowBioPopup] = useState(false);
 // const { currentUser } = useContext(AuthContext);
  const toggleBioPopup = () => {
    setShowBioPopup((prevValue) => !prevValue);
  };
  
  const closeBioPopup = () => {
    setShowBioPopup(false);
  };
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span> {data.user?.displayName}</span>
        {data.showInput && <button onClick={toggleBioPopup}>Open Bio</button>}
        <div className="chatIcons">
        {/* <img src={cam}/>
          <img src={addicon}/>
          <img src={more}/>*/}
        </div>
      </div>
      <Messages/>
      {data.showInput && <InputMessages />}
      {showPosts && <Posts />}
      {showBioPopup && <div className="popup"> 
      <button className="close-button" onClick={closeBioPopup}>X</button>
      <ShowBio user={data.user?.uid} /> 
      </div>}

    </div>
  )
}

export default Chat