import React from 'react'
import './ChatWindow.css' 
import Chat from './Chat.jsx'

const ChatWindow = () => {
  return (
    <div className='chat-window'>

      {/* Navbar */}
      <div className='navbar'>
        <span>ECHOMIND <i class="fa-solid fa-angle-down"></i></span>
        <div className="usericondiv">
          <span><i class="fa-solid fa-user"></i></span>
        </div>
      </div>

      {/* Chats */}
      <Chat/>
      {/* Chat input */}
      <div className="chat-input">
        <div className='user-input'>
          <input placeholder='Ask anything' type="text" name="" id="" />
          <div id='submit'><i class="fa-solid fa-paper-plane"></i></div>
        </div>
        <p></p>
      </div>
    </div>
  )
}

export default ChatWindow