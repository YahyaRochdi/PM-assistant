'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function formatChatText(text: string) { 
  return text.split('\n').map((paragraph, idx) => (
    <React.Fragment key={idx}>
      {paragraph.split(/\*\*(.*?)\*\*/).map((part, index) => (
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
      ))}
      {idx < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
}

export default function Chatbox() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = userInput.trim();
    if (!trimmedMessage) return;

    setIsLoading(true);
    setChatHistory(prevHistory => [...prevHistory, { type: 'user', content: trimmedMessage }]);
    setUserInput('');

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChatHistory(prevHistory => [...prevHistory, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatHistory(prevHistory => [
        ...prevHistory,
        { type: 'bot', content: 'Sorry, I am unable to respond at the moment.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return ( <section>
    <div className="chat-container">
      <div ref={chatboxRef} className="chatbox">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
            <strong>{message.type === 'user' ? 'You' : 'PM Assistant'}:</strong> {formatChatText(message.content)}
          </div>
        ))}
        {isLoading && <div className="loading-spinner"></div>}
      </div>
      <form className="message-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button className="sendbutton" type="submit">Send</button>
      </form>
    </div> </section>
  );
} 