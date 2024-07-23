import React, { useState } from 'react';
// importing external style
import { styles } from "../styles";

// for displaying the modal view/window
function ModalWindow(props) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div
      style={{
        ...styles.modalWindow,
        ...{ opacity: props.visible ? '1' : '0' },
      }}
    >
      <div style={{ 
        maxHeight: '300px', 
        overflowY: 'scroll', 
        padding: '10px', 
        backgroundColor: 'white', 
        borderRadius: '10px',
        overflowX: 'hidden' // Hide horizontal scrollbar
      }}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            style={{ 
              marginBottom: '10px', 
              border: index === messages.length - 1 ? '1px solid #ddd' : 'none', // Remove border for already sent messages
              padding: '10px', 
              borderRadius: '10px',
              wordBreak: 'break-word' // Ensure long words break and don't cause horizontal scrolling
            }}
          >
            {message}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ModalWindow;
