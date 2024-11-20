import React, { useState} from 'react';
import ChatBubbleUser from './components/ChatBubbleUser';
import ChatBubbleLLM from './components/ChatBubbleLLM';
import { sendMessage} from './controllers/ChatController';
import './styles/ChatApp.css';
//import FileUploadButton from './components/FileUploadButton';
//import { sendFile } from './controllers/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', message: inputText } // Add user message
    ]);
  
    try {
      const response = await sendMessage(inputText);
      console.log('LLM Response:', response); // Debug log for LLM response
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'llm', message: response } // Add LLM response message
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setInputText(''); // Clear user input
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          msg.type === 'user' ? (
            <ChatBubbleUser key={index} message={msg.message} />
          ) : (
            <ChatBubbleLLM key={index} message={msg.message} />
          )
        ))}
      </div>
      <div className='input-container'>
      <textarea
        placeholder="Escribe tu mensaje o selecciona un archivo"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="2"
      />
      <button className="send-button" onClick={handleSend}>
        Enviar
      </button>
      </div>
      
    </div>
  );
}

export default App;
