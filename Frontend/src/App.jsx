import './App.css'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import Chat from './components/Chat.jsx'
import { Mycontext } from './components/Mycontext.jsx';


function App() {
  const providerValues = {};
  return (
    <div className='app'>
      <Mycontext.Provider value = {providerValues}>
        <Sidebar />
        <ChatWindow />
        <Chat />
      </Mycontext.Provider>
    </div>
  )
}

export default App
