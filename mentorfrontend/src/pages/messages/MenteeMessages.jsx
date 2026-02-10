import React, { useState } from 'react';
import { Search, User, Circle } from 'lucide-react';
import ChatInterface from '../../components/ChatInterface';

const MenteeMessages = () => {
    // Mock Data - In a real app, fetch from API
    const initialMentees = [
        {
            id: 1,
            name: 'Alex Morgan',
            role: 'Junior Developer',
            lastMessage: "Thanks for the feedback!",
            time: "10:30 AM",
            unread: 2,
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 2,
            name: 'Sarah Jones',
            role: 'Student',
            lastMessage: "Can we reschedule our meeting?",
            time: "Yesterday",
            unread: 0,
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 3,
            name: 'David Chen',
            role: 'QA Engineer',
            lastMessage: "I've completed the assignment.",
            time: "Mon",
            unread: 0,
            img: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
    ];

    const [selectedMentee, setSelectedMentee] = useState(initialMentees[0]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMentees = initialMentees.filter(mentee =>
        mentee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-100px)] flex gap-6">
            {/* Sidebar - Mentee List */}
            <div className="w-1/3 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search mentees..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredMentees.map((mentee) => (
                        <div
                            key={mentee.id}
                            onClick={() => setSelectedMentee(mentee)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMentee.id === mentee.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img className="h-10 w-10 rounded-full" src={mentee.img} alt={mentee.name} />
                                        {mentee.id === 1 && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                                    </div>
                                    <div>
                                        <h3 className={`text-sm font-semibold ${selectedMentee.id === mentee.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                                            {mentee.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">{mentee.role}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{mentee.time}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2 pl-12">
                                <p className="text-sm text-gray-600 truncate w-32">{mentee.lastMessage}</p>
                                {mentee.unread > 0 && (
                                    <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {mentee.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content - Chat Area */}
            <div className="w-2/3">
                {selectedMentee ? (
                    <ChatInterface
                        recipientName={selectedMentee.name}
                        recipientImg={selectedMentee.img}
                        initialMessages={[
                            { id: 1, sender: 'other', text: selectedMentee.lastMessage, time: selectedMentee.time }
                        ]}
                    />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 text-gray-400">
                        <User className="w-16 h-16 mb-4 text-gray-300" />
                        <p className="text-lg">Select a mentee to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenteeMessages;
