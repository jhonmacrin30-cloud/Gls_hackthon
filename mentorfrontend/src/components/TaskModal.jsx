import React, { useState, useEffect } from 'react';
import { X, Calendar, User, AlignLeft, Check, Trash2, Tag } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, onDelete, initialTask, statusOptions }) => {
    const [title, setTitle] = useState('');
    const [mentee, setMentee] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('todo');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (initialTask) {
                setTitle(initialTask.title);
                setMentee(initialTask.mentee);
                setDueDate(initialTask.due); // Assuming 'Feb 15' format or similar, might need date parsing for input
                setStatus(initialTask.status || 'todo');
                setDescription(initialTask.description || '');
            } else {
                // Reset form for new task
                setTitle('');
                setMentee('');
                setDueDate('');
                setStatus('todo');
                setDescription('');
            }
        }
    }, [isOpen, initialTask]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: initialTask ? initialTask.id : Date.now(),
            title,
            mentee,
            due: dueDate,
            status,
            description
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">
                        {initialTask ? 'Edit Task' : 'Create New Task'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200 cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                            placeholder="e.g., Database Design"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assignee (Mentee)</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                required
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Mentee Name"
                                value={mentee}
                                onChange={(e) => setMentee(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text" // Using text to match mock data format 'Feb 15', in real app use date picker
                                    required
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g. Feb 15"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white cursor-pointer"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    {Object.keys(statusOptions).map(key => (
                                        <option key={key} value={key}>
                                            {key === 'todo' ? 'To Do' :
                                                key === 'inProgress' ? 'In Progress' :
                                                    key === 'review' ? 'Review' : 'Completed'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none"
                                placeholder="Add task details..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        {initialTask && (
                            <button
                                type="button"
                                onClick={() => { onDelete(initialTask.id, initialTask.status); onClose(); }}
                                className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center cursor-pointer"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Check className="w-4 h-4" />
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
