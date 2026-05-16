import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Chat components
const ChatWidget = ({ isOpen, onClose, userType }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setLoading(true);
      // Add message to local state immediately for UI responsiveness
      const messageObj = {
        id: Date.now(),
        text: newMessage,
        sender: userType,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, messageObj]);
      
      // Send to backend
      await axios.post('http://localhost:8080/api/chat/message', messageObj, {
        withCredentials: true
      });

      setNewMessage('');
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
    >
      {/* Chat Header */}
      <div className="p-4 bg-red-600 dark:bg-red-700 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Live Support</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === userType ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === userType
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Type your message..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

// Main Help Component
const Help = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userType, setUserType] = useState('user'); // or 'seller'

  useEffect(() => {
    // Determine user type on component mount
    const checkUserType = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/type', {
          withCredentials: true
        });
        setUserType(response.data.type);
      } catch (error) {
        console.error('Error checking user type:', error);
      }
    };
    
    checkUserType();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Your existing help page content */}
      
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-red-600 text-white rounded-full shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>

      {/* Chat Widget */}
      {isChatOpen && (
        <ChatWidget 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
          userType={userType}
        />
      )}
    </div>
  );
};

export default Help;