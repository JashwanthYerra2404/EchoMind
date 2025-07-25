import React from 'react'
import './ChatWindow.css' 
import Chat from './Chat.jsx'
import { Mycontext } from './Mycontext.jsx';
import { useContext, useState } from 'react';
import { ScaleLoader } from 'react-spinners';

const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currThreadId } = useContext(Mycontext);
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };
    try {
      const response = await fetch('http://localhost:3000/api/chat', options);
      const res = await response.json();
      // console.log(res.reply);
      setReply(res.reply);
    } catch (error) {
      console.error('Error fetching reply:', error);
    }
    setLoading(false);
  }

  return (
    <div className='chat-window'>

      {/* Navbar */}
      <div className='navbar'>
        <span>ECHOMIND <i className="fa-solid fa-angle-down"></i></span>
        <div className="usericondiv">
          <span><i class="fa-solid fa-user"></i></span>
        </div>
      </div>

      {/* Chats */}
      <Chat/>
      {/* Loading spinner */}
      <ScaleLoader color='#fff' loading={loading}></ScaleLoader>
      {/* Chat input */}
      <div className="chat-input">
        <div className='user-input'>
          <input placeholder='Ask anything' type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? getReply() : null}
          />
          <div id='submit' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p></p>
      </div>
    </div>
  )
}

export default ChatWindow