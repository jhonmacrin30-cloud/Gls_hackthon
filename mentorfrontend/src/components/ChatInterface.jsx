import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MoreVertical, Phone, Video } from 'lucide-react';

const ChatInterface = ({ recipientName, recipientImg, initialMessages = [] }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = {
            id: Date.now(),
            sender: 'me',
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        
        // Simulate reply for demo purposes
        setIsTyping(true);
        setTimeout(() => {
            const replyMsg = {
                id: Date.now() + 1,
                sender: 'other',
                text: "Thanks for the message! I'll get back to you shortly.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, replyMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img 
                            src={recipientImg || `https://ui-avatars.com/api/?name=${recipientName}&background=random`} 
                            alt={recipientName} 
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{recipientName}</h3>
                        <p className="text-xs text-green-600 font-medium">Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                    <button className="hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                            <Send className="w-8 h-8 text-indigo-300" />
                        </div>
                        <p>Start a conversation with {recipientName}</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                                    msg.sender === 'me' 
                                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                                }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p className={`text-[10px] mt-1 text-right ${
                                    msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'
                                }`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
                <div className="flex gap-2 items-center bg-gray-50 border border-gray-200 rounded-full px-2 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 px-4"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        disabled={!inputValue.trim()}
                        className={`p-3 rounded-full flex items-center justify-center transition-all ${
                            inputValue.trim() 
                                ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-105' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
