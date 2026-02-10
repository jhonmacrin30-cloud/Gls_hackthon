import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Link, Mail, Edit2, Loader2, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Profile = () => {
    const { user, setUser } = useAuth(); // Assuming setUser is available in context or we refetch
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Initialize profile with user data or defaults
    const [profile, setProfile] = useState({
        name: user?.name || '',
        title: user?.mentorProfile?.currentRole || '',
        company: user?.mentorProfile?.company || '',
        bio: user?.mentorProfile?.bio || '',
        location: user?.mentorProfile?.location || '',
        email: user?.email || '',
        website: 'johndoe.dev',
        skills: user?.mentorProfile?.expertise || [],
        experience: user?.mentorProfile?.experience || ''
    });

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name || '',
                title: user.mentorProfile?.currentRole || '',
                company: user.mentorProfile?.company || '',
                bio: user.mentorProfile?.bio || '',
                location: user.mentorProfile?.location || '',
                email: user.email || '',
                website: 'johndoe.dev',
                skills: user.mentorProfile?.expertise || [],
                experience: user.mentorProfile?.experience || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSkillsChange = (e) => {
        const skillsString = e.target.value;
        const skillsArray = skillsString.split(',').map(s => s.trim());
        setProfile({ ...profile, skills: skillsArray });
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            // Update local user state via context to reflect changes immediately
            if (setUser) {
                setUser(prevUser => ({
                    ...prevUser,
                    name: profile.name,
                    email: profile.email,
                    mentorProfile: {
                        ...prevUser?.mentorProfile,
                        currentRole: profile.title,
                        company: profile.company,
                        bio: profile.bio,
                        location: profile.location,
                        experience: profile.experience,
                        expertise: profile.skills
                    }
                }));
            }

            setLoading(false);
            setIsEditing(false);
        }, 800);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 bg-indigo-600"></div>

                <div className="px-6 pb-6">
                    <div className="flex justify-between items-end -mt-12 mb-6">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm">
                                <img src={user?.profileImage && user.profileImage !== 'no-photo.jpg' ? user.profileImage : `https://ui-avatars.com/api/?name=${profile.name}&background=random`} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                                <Camera className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            disabled={loading}
                            className={`bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 flex items-center shadow-sm cursor-pointer transition-all ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : isEditing ? (
                                <>
                                    <Save className="w-4 h-4 mr-2 text-indigo-600" />
                                    Save Changes
                                </>
                            ) : (
                                <>
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </>
                            )}
                        </button>
                    </div>

                    <div className="animate-fadeIn">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" name="name" value={profile.name} onChange={handleChange} className="block w-full border-gray-300 border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                                        <input type="text" name="title" value={profile.title} onChange={handleChange} className="block w-full border-gray-300 border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Current Role" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                        <input type="text" name="company" value={profile.company} onChange={handleChange} className="block w-full border-gray-300 border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Company" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input type="text" name="location" value={profile.location} onChange={handleChange} className="block w-full border-gray-300 border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Location" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (Comma separated)</label>
                                    <input type="text" value={profile.skills.join(', ')} onChange={handleSkillsChange} className="block w-full border-gray-300 border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="React, Node.js, System Design..." />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                                <p className="text-gray-600 font-medium">{profile.title} {profile.company && `@ ${profile.company}`}</p>

                                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" /> {profile.location || 'Add location'}
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-1" /> {profile.email}
                                    </div>
                                    <div className="flex items-center">
                                        <Link className="w-4 h-4 mr-1" /> {profile.website}
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                            {isEditing ? (
                                <textarea name="bio" value={profile.bio} onChange={handleChange} className="block w-full border-gray-300 border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none" placeholder="Tell us about your mentorship style and experience..." />
                            ) : (
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {profile.bio || 'Add a bio to help mentees know you better.'}
                                </p>
                            )}
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                                {profile.skills.length === 0 && <span className="text-gray-400 italic">No skills listed yet</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Reviews Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-indigo-600">{user?.mentorProfile?.totalSessions || 0}</span>
                        <span className="text-gray-500 text-sm">Sessions Completed</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-indigo-600">{user?.mentorProfile?.rating || 'New'}</span>
                        <span className="text-gray-500 text-sm">Average Rating</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-indigo-600">{user?.mentorProfile?.experience || '0'} YoE</span>
                        <span className="text-gray-500 text-sm">Experience</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
