import React, { useContext,useEffect,useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const ref = useRef()
  useEffect(() => {
     ref.current?.scrollIntoView({behavior:"smooth"})
   ,[message]});

     const getTimeString = () => {
      const timestamp = message.date.toDate(); 
     
      const day = timestamp.getDate();
      const month = timestamp.toLocaleString('default', { month: 'short' }); 
      
      const hour = timestamp.getHours();
      const minute = timestamp.getMinutes();
      
      const dateString = `${day}-${month}`;
      const timeString = hour > 12 ? `${hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
     
      return (
        <>
          {dateString} <br/>
          {timeString}
        </>
      )
    };


  return (
    <div ref = {ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={  message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL} alt=""/>
            <span>{getTimeString()}</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {message.image && <img src={message.image} alt="" />}

        </div>
    </div>
  )
}

export default Message