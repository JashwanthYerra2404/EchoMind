import React, { use } from 'react'
import './Chat.css'
import { Mycontext } from './Mycontext.jsx';
import { useContext, useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Import a highlight.js theme

const Chat = () => {
  const { newChat, prevChats, reply } = useContext(Mycontext);
  const [ latestReply, setLatestReply ] = useState(null);

  useEffect(() => {

    if(!reply || !prevChats?.length){
      setLatestReply(null); // Reset latest reply if no reply is present
      return;
    }

    const content = reply.split(" "); // Split into individual words

    let idx = 0;
    const interval = setInterval(() => {
        setLatestReply(content.slice(0, idx+1).join(" "));
        idx++;
        if(idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);

  }, [prevChats, reply])

  return (
    <>
    { newChat && <h1>Start a new chat</h1>}
    <div className='chats'>
      {
        prevChats?.slice(0, -1).map((chat, index) => (
          <div key={`message-${index}`} className={chat.role === 'user' ? 'user-div' : 'gpt-div'}>
            <p className={chat.role === 'user' ? 'user-message' : 'gpt-message'}>
              <Markdown rehypePlugins={[rehypeHighlight]}>{chat.content}</Markdown>
            </p>
          </div>
        ))
      }

      {/* Display latest reply if available */}
      {prevChats.length > 0 && (
        <div className="gpt-div">
          <div className="gpt-message">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {latestReply === null 
                ? prevChats[prevChats.length - 1].content 
                : latestReply}
            </Markdown>
          </div>
        </div>
      )}


      {/* <div className='user-div'>
        <p className='user-message'>Let's say i need to build movie booking web application how can i handle the ticket booking process when multiple people try to book the same seat at the same time how to resolve this problem</p>
      </div>
      <div className='gpt-div'>
        <p className='gpt-message'>Great question — handling concurrent ticket bookings is one of the most critical and tricky aspects of a movie booking system. You need to ensure consistency and prevent double booking of the same seat when multiple users attempt to book at the same time.</p>
      </div> */}
    </div>
    </>
  )
}

export default Chat