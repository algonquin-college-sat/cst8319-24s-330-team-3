import React, { useState, useEffect, useRef } from 'react';
import { styles } from "../styles";

function ModalWindow({ visible, messages, onSendMessage }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{
        ...styles.modalWindow,
        opacity: visible ? '1' : '0',
        display: 'flex',
        flexDirection: 'column',
        height: '450px', // Adjusted height
        maxWidth: '350px', 
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    >
      <div style={{
        flex: 1,
        overflowY: 'scroll',
        padding: '10px',
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
      }}>
        {messages.map((message, index) => {
          // Format timestamp
          const formattedTimestamp = new Date(message.timestamp).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });

          const isUserMessage = message.sender !== "Restaurant";

          return (
            <div key={index} style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: isUserMessage ? 'flex-start' : 'flex-end',
              textAlign: isUserMessage ? 'left' : 'right',
            }}>
              <div style={{
                maxWidth: '80%',
                wordBreak: 'break-word',
                padding: '10px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: isUserMessage ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  fontSize: '0.8em',
                  marginBottom: '5px',
                }}>
                  <span style={{ fontWeight: 'bold', backgroundColor: 'transparent' }}>
                    {isUserMessage ? message.sender : 'Restaurant'}
                  </span>
                  <span style={{ marginLeft: '10px', backgroundColor: 'transparent' }}>
                    {formattedTimestamp}
                  </span>
                </div>
                <div style={{
                  backgroundColor: isUserMessage ? '#e0f7fa' : '#f3e5f5', // Light blue for user messages, light purple for restaurant messages
                  padding: '10px',
                  borderRadius: '10px',
                  color: '#000', // Text color for messages
                }}>
                  <span>{message.message}</span> {/* Only the message text has background color */}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        borderTop: '1px solid #ddd', 
        padding: '10px' 
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          placeholder="Type a message..."
        />
        <button 
          onClick={handleSendMessage} 
          style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ModalWindow;
