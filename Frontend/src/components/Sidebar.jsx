import React from 'react'
import './Sidebar.css'
import chatGptLogo from '/src/assets/ChatGPT-Logo.png';
import { Mycontext } from './Mycontext.jsx';

const Sidebar = () => {
  return (
    <section className='sidebar'>
      {/* new chat button */}
      <button className='new-chat-button'>
        <img src={chatGptLogo} alt="GPT Logo" className='logo' />
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>
      {/* Chat history */}
      <ul className='chat-history'>
        <li>History 1</li>
        <li>History 2</li>
        <li>History 3</li>
        <li>History 4</li>
      </ul>
      {/* sign */}
      
    </section>
  )
}

export default Sidebar