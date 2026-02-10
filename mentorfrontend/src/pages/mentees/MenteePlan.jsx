import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlanningCalendar from '../../components/PlanningCalendar';
import { ArrowLeft, CheckCircle, Clock, Target } from 'lucide-react';

const MenteePlan = () => {
    const { menteeId } = useParams();
    const navigate = useNavigate();

    // Mock Mentee Data (In real app, fetch using menteeId)
    const mentee = {
        id: menteeId,
        name: 'Alex Morgan',
        role: 'Junior Developer',
        goal: 'Crack FAANG',
        progress: 65,
    };

    return (
        <div className="space-y-6">
            {/* Header / Navigation */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mentorship Plan: {mentee.name}</h1>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Target className="w-4 h-4" />
                        Goal: <span className="font-medium text-indigo-600">{mentee.goal}</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Calendar View */}
                <div className="lg:col-span-2 space-y-6">
                    <PlanningCalendar />
                </div>

                {/* Sidebar - Upcoming & Progress */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-indigo-600" />
                            Upcoming Sessions
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:padding-0">
                                <div className="flex-shrink-0 w-12 text-center bg-indigo-50 rounded p-1">
                                    <span className="block text-xs font-bold text-indigo-600 uppercase">Feb</span>
                                    <span className="block text-lg font-bold text-gray-900">12</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">Code Review: React Hooks</h4>
                                    <p className="text-xs text-gray-500 mt-1">10:00 AM - 11:00 AM</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-12 text-center bg-indigo-50 rounded p-1">
                                    <span className="block text-xs font-bold text-indigo-600 uppercase">Feb</span>
                                    <span className="block text-lg font-bold text-gray-900">19</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">Mock Interview</h4>
                                    <p className="text-xs text-gray-500 mt-1">2:00 PM - 3:00 PM</p>
                                </div>
                            </li>
                        </ul>
                        <button className="w-full mt-4 text-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                            Schedule New Session
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Recent Milestones
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">JavaScript Advanced Concepts</h4>
                                    <p className="text-xs text-gray-500">Completed on Feb 5</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Portfolio Review</h4>
                                    <p className="text-xs text-gray-500">Completed on Jan 28</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenteePlan;
