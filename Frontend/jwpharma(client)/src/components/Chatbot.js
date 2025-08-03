import React, { useState, useEffect, useRef } from "react";
import "../css/Chatbot.css";

const TypingIndicator = () => (
  <div className="typing-indicator">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      // Add initial message
      if (messages.length === 0) {
        setTimeout(() => {
          setMessages([
            {
              text: "👋 Hi! I'm your AI assistant. How can I help you today?",
              sender: "bot",
            },
          ]);
        }, 500);
      }
    }
  }, [isOpen]);

  // Function to fetch response from responses.json
  const getBotResponse = async (userInput) => {
    try {
      const responseJson = await fetch("/responses.json");
      const responses = await responseJson.json();
      const lowerInput = userInput.toLowerCase();

      // Find the response based on user input
      const matchedResponse =
        responses[
          Object.keys(responses).find((key) => lowerInput.includes(key))
        ];

      // Return matched response or default response
      return (
        matchedResponse ||
        responses.default ||
        "Sorry, I didn't understand that."
      );
    } catch (error) {
      console.error("Error fetching responses:", error);
      return "Sorry, something went wrong. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Fetch bot response based on user input
    const botResponse = await getBotResponse(input);

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1500);
  };

  return (
    <div className="chatbot-wrapper">
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <>
          <div className="chat-backdrop" onClick={() => setIsOpen(false)} />
          <div className="chat-container">
            <div className="chat-header">
              <h3>Chat with us!</h3>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="messages-container" ref={messagesContainerRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="message-input"
              />
              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <img
                  src="https://cdn0.iconfinder.com/data/icons/miscellaneous-elements-2/32/send_share_forward-256.png"
                  alt="Send"
                  height={45}
                  width={45}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
