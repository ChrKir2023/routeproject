import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = ({socket}) => { 
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);
  console.log("The socket is:",socket);

  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
    console.log("UseEffect 1:");
  }, [socket, messages])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
    console.log("UseEffect 2:");
  }, [socket])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    console.log("UseEffect 3:");
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket}/> 
      </div>
    </div>
  )
}

export default ChatPage