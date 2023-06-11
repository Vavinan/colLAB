import React, { useContext,useState } from 'react'
import addicon from "../images/addicon.png"
import cam from "../images/cam.png"
import more from "../images/more.png"
import Messages from './Messages'
import InputMessages from "./InputMessages"
import { ChatContext } from '../context/ChatContext'
import Posts from '../pages/Posts'
const Chat = () => {

  const {data} = useContext(ChatContext);
  const [showPosts, setShowPosts] = useState(false);
  const handlePostsClick = () => {
    setShowPosts(!showPosts);
  };

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span> {data.user?.displayName}</span>
        <div className="chatIcons">
        {/* <img src={cam}/>
          <img src={addicon}/>
          <img src={more}/>*/}
          <button onClick={handlePostsClick} className="badge rounded-pill bg-info text-dark">
            Project Posts
          </button>
        </div>
      </div>
      <Messages/>
      <InputMessages/>
      {showPosts && <Posts />}
    </div>
  )
}

export default Chat