'use client';
import React, { useState, useEffect, useRef } from 'react';



export default function Zigzag2() {
  
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





  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
 
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            
            <h1 className="h2 mb-4">PM Assistant</h1>
            <p className="text-xl text-gray-400"> </p>
          </div>
 
          {/* Items */}
             <div className="grid gap-20">
 
             
                
              </div>
          </div>
            
 
          
 
       
      </div>
      
    </section>

    
  )
}
 