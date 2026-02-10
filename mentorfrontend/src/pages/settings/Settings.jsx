import React, { useState } from 'react';
import { Bell, Lock, CreditCard, User, Globe, CheckCircle, Loader2 } from 'lucide-react';

const Settings = () => {
    const [submitting, setSubmitting] = useState(false);
    const [saved, setSaved] = useState(false);

    // Mock settings state
    const [settings, setSettings] = useState({
        firstName: 'John',
        lastName: 'Doe',
        notifications: {
            newBookings: true,
            messageAlerts: true,
            emailDigest: false
        }
    });

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleToggle = (key) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [key]: !settings.notifications[key]
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSaved(false);

        // Simulate API save
        setTimeout(() => {
            setSubmitting(false);
            setSaved(true); // Show success message
            // Hide success message after 3 seconds
            setTimeout(() => setSaved(false), 3000);
        }, 800);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {/* Account Settings */}
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                        <User className="w-5 h-5 mr-2 text-gray-400" />
                        Account Information
                    </h2>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={settings.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={settings.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                        <Bell className="w-5 h-5 mr-2 text-gray-400" />
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="newBookings"
                                    type="checkbox"
                                    checked={settings.notifications.newBookings}
                                    onChange={() => handleToggle('newBookings')}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="newBookings" className="font-medium text-gray-700 cursor-pointer">New Session Bookings</label>
                                <p className="text-gray-500">Get notified when a student books a session with you.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="messageAlerts"
                                    type="checkbox"
                                    checked={settings.notifications.messageAlerts}
                                    onChange={() => handleToggle('messageAlerts')}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="messageAlerts" className="font-medium text-gray-700 cursor-pointer">Message Alerts</label>
                                <p className="text-gray-500">Get notified when a student sends you a message.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy */}
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                        <Lock className="w-5 h-5 mr-2 text-gray-400" />
                        Privacy & Security
                    </h2>
                    <button type="button" className="text-indigo-600 font-medium hover:text-indigo-500 text-sm cursor-pointer">Change Password</button>
                </div>

                <div className="px-6 py-4 bg-gray-50 text-right flex items-center justify-end">
                    {saved && (
                        <span className="text-green-600 font-medium text-sm mr-4 flex items-center animate-fadeIn">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Settings Saved
                        </span>
                    )}
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-all ${submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
