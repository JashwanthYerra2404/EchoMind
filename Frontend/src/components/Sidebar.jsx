import React from 'react'
import './Sidebar.css'
import chatGptLogo from '/src/assets/ChatGPT-Logo.png';
import { Mycontext } from './Mycontext.jsx';
import { useContext, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';

const Sidebar = () => {
  const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(Mycontext);

  const getAllThreads = async() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch('http://localhost:3000/api/thread', options);
      const res = await response.json();
      const filteredThreads = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
      // console.log(filteredThreads);
      setAllThreads(filteredThreads);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread = async (newthreadId) => {
    setCurrThreadId(newthreadId);

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try{
      const response = await fetch(`http://localhost:3000/api/thread/${newthreadId}`, options);
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setPrompt("");
      setReply(null);
    }
    catch (error) {
      console.error('Error changing thread:', error);
    }
  }

  const delteThread = async (threadId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try{
      const response = await fetch(`http://localhost:3000/api/thread/${threadId}`, options);
      const res = await response.json();
      console.log(res);
      // Remove the deleted thread from the state
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if(threadId === currThreadId) {
        createNewChat();
      }
    }
    catch (error) {
      console.error('Error deleting thread:', error);
    }
  }


  return (
    <section className='sidebar'>
      {/* new chat button */}
      <button onClick={createNewChat} className='new-chat-button'>
        <img src={chatGptLogo} alt="GPT Logo" className='logo' />
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>
      {/* Chat history */}
      <ul className='chat-history'>
        {
          allThreads.map((thread, idx) => (
            <li key={idx} onClick={() => changeThread(thread.threadId)}>{thread.title} 
            <i
             onClick={(e) => {
              delteThread(thread.threadId);
              e.stopPropagation();
              } 
             } class="fa-solid fa-trash">
             </i>
             </li>
          ))
        }
      </ul>
      {/* sign */}
      
    </section>
  )
}

export default Sidebar