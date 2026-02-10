import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Rocket, BookOpen, Video, Trash2 } from 'lucide-react';
import EventModal from './EventModal';

const PlanningCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([
        { id: 1, title: 'Code Review', date: new Date(new Date().getFullYear(), new Date().getMonth(), 12), time: '10:00', type: 'session', description: 'Review React hooks implementation' },
        { id: 2, title: 'React Basics', date: new Date(new Date().getFullYear(), new Date().getMonth(), 15), time: '12:00', type: 'milestone', description: 'Complete module 1' },
        { id: 3, title: 'Mock Interview', date: new Date(new Date().getFullYear(), new Date().getMonth(), 22), time: '14:00', type: 'session', description: 'Practice behavioral questions' },
    ]);

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(clickedDate);
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEventClick = (e, event) => {
        e.stopPropagation();
        setSelectedEvent(event);
        setSelectedDate(null);
        setIsModalOpen(true);
    };

    const handleSaveEvent = (eventData) => {
        if (selectedEvent) {
            // Edit existing
            setEvents(events.map(e => e.id === eventData.id ? eventData : e));
        } else {
            // Add new
            setEvents([...events, eventData]);
        }
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-100"></div>);
        }

        // Days of current month
        for (let i = 1; i <= totalDays; i++) {
            const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

            // Find events for this day
            const dayEvents = events.filter(e =>
                e.date.getDate() === i &&
                e.date.getMonth() === currentDate.getMonth() &&
                e.date.getFullYear() === currentDate.getFullYear()
            );

            days.push(
                <div
                    key={i}
                    onClick={() => handleDayClick(i)}
                    className={`h-24 border border-gray-100 p-2 transition-colors hover:bg-gray-50 relative group cursor-pointer ${isToday ? 'bg-indigo-50/30' : 'bg-white'}`}
                >
                    <span className={`text-sm font-medium ${isToday ? 'text-indigo-600 bg-indigo-100 w-6 h-6 rounded-full flex items-center justify-center p-4' : 'text-gray-700'}`}>
                        {i}
                    </span>

                    <div className="mt-1 space-y-1 overflow-hidden max-h-[calc(100%-2rem)]">
                        {dayEvents.map(event => (
                            <div
                                key={event.id}
                                onClick={(e) => handleEventClick(e, event)}
                                className={`p-1.5 rounded text-xs font-medium truncate cursor-pointer hover:opacity-80 transition-opacity ${event.type === 'session' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                                    }`}
                            >
                                <div className="flex items-center gap-1">
                                    {event.type === 'session' ? <Video className="w-3 h-3" /> : <Rocket className="w-3 h-3" />}
                                    <span>{event.time}</span>
                                </div>
                                <div className="mt-0.5 truncate">{event.title}</div>
                            </div>
                        ))}
                    </div>

                    <button className="absolute bottom-2 right-2 p-1 rounded-full bg-indigo-50 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-100">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white rounded shadow-sm text-gray-600 transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setSelectedDate(new Date());
                            setSelectedEvent(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Event
                    </button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
                {renderCalendarDays()}
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                initialDate={selectedDate}
                initialEvent={selectedEvent}
            />
        </div>
    );
};

export default PlanningCalendar;
