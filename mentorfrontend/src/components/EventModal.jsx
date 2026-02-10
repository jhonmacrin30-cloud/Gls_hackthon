import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, AlignLeft, Check, Trash2 } from 'lucide-react';

const EventModal = ({ isOpen, onClose, onSave, onDelete, initialDate, initialEvent }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('session');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (initialEvent) {
                setTitle(initialEvent.title);
                // Convert date to YYYY-MM-DD
                const d = new Date(initialEvent.date);
                setDate(d.toISOString().split('T')[0]);
                setTime(initialEvent.time);
                setType(initialEvent.type || 'session');
                setDescription(initialEvent.description || '');
            } else if (initialDate) {
                // Reset form for new event
                setTitle('');
                const d = new Date(initialDate);
                // Adjust for timezone offset to ensure correct date string
                const offsetDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
                setDate(offsetDate.toISOString().split('T')[0]);
                setTime('10:00');
                setType('session');
                setDescription('');
            }
        }
    }, [isOpen, initialDate, initialEvent]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: initialEvent ? initialEvent.id : Date.now(),
            title,
            date: new Date(date),
            time,
            type,
            description
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">
                        {initialEvent ? 'Edit Event' : 'Add New Event'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                            placeholder="e.g., Code Review"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="date"
                                    required
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="time"
                                    required
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${type === 'session' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input
                                    type="radio"
                                    className="hidden"
                                    name="type"
                                    value="session"
                                    checked={type === 'session'}
                                    onChange={() => setType('session')}
                                />
                                <span className="text-sm font-medium">Session</span>
                            </label>
                            <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${type === 'milestone' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input
                                    type="radio"
                                    className="hidden"
                                    name="type"
                                    value="milestone"
                                    checked={type === 'milestone'}
                                    onChange={() => setType('milestone')}
                                />
                                <span className="text-sm font-medium">Milestone</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none"
                                placeholder="Add any details..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        {initialEvent && (
                            <button
                                type="button"
                                onClick={() => { onDelete(initialEvent.id); onClose(); }}
                                className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
