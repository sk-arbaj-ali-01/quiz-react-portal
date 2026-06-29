import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RelateTeacherToStudents() {
    // Operational States
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');

    // Logged-in Student Identity parameters
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('Student');
    const [studentEmail, setStudentEmail] = useState('');

    // UI State Tracking
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const USERS_URL = import.meta.env.VITE_USERS_URL;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

    // 1. Initial Load: Recover student context from session storage and fetch teacher directory
    useEffect(() => {
        const initializeComponent = async () => {
            setIsLoading(true);

            // Extract logged-in student info from local storage
            try {
                const storedAuth = localStorage.getItem('authData');
                let parsedData = {};
                if (storedAuth) {
                    parsedData = JSON.parse(storedAuth);

                    let parsedDate = new Date(parsedData.expires);
                    let nowDate = Date.now();
                    if(nowDate > parsedDate){
                        localStorage.removeItem('authData');
                        window.dispatchEvent(new Event('storage'));
                        navigate("/login");
                    }

                    if (parsedData?.id) setStudentId(parsedData.id);
                    if (parsedData?.fullName) setStudentName(parsedData.fullName);
                    if (parsedData?.emailId) setStudentEmail(parsedData.emailId);
                }
                else {
                    window.dispatchEvent(new Event('storage'));
                    navigate("/login");
                }
            } catch (e) {
                console.error("Error fetching local student identity profiles:", e);
            }

            // Fetch verified teachers endpoint
            const storedAuth = localStorage.getItem('authData');
            let parsedData = {};
            if (storedAuth) {
                parsedData = JSON.parse(storedAuth);
            }
            else {
                window.dispatchEvent(new Event('storage'));
                navigate("/login");
            }
            try {
                const response = await fetch(`${BASE_URL}/${USERS_URL}/teachers`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${parsedData?.accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to download teacher matrix codes.');
                }
                const data = await response.json();
                setTeachers(data?.records);
            } catch (error) {
                console.error("Error fetching data repository streams:", error);
                triggerToast("Failed to initialize teacher listing variables.", "error");

            } finally {
                setIsLoading(false);
            }
        };

        initializeComponent();
    }, []);

    // 2. Form Submission Action: Execute POST operation matching structural specifications
    const handleAssignTeacher = async (e) => {
        e.preventDefault();

        const storedAuth = localStorage.getItem('authData');
        let parsedData = {};

        if (storedAuth) {
            parsedData = JSON.parse(storedAuth);
            if (parsedData?.id) setStudentId(parsedData.id);
            if (parsedData?.fullName) setStudentName(parsedData.fullName);
            if (parsedData?.emailId) setStudentEmail(parsedData.emailId);
        }
        else {
            window.dispatchEvent(new Event('storage'));
            navigate("/login");
        }

        if (!selectedTeacher) {
            triggerToast("Please select an instructor to continue tracking.", "error");
            return;
        }

        setIsSubmitting(true);

        // DTO Target payload configuration linking student with selected teacher ID
        const payload = {
            teacherId: selectedTeacher
        };

        try {
            const response = await fetch(`${BASE_URL}/${USERS_URL}/teachers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${parsedData?.accessToken}`
                },
                body: JSON.stringify(payload)
            });

            if (response.status === 201 || response.ok) {
                triggerToast("Instructor successfully added to your course track!", "success");
                setSelectedTeacher('');
            } else {
                throw new Error(`Server returned HTTP code: ${response.status}`);
            }
        } catch (error) {
            console.error("Assignment compilation error:", error);
            triggerToast("Failed to lock tracking assignment link.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                    <svg className="animate-spin h-5 w-5 text-[#4a5fcd]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading Available Class Faculties...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-16 relative">

            {/* Toast Alert Frame Popup Container */}
            {toast.show && (
                <div className="fixed top-5 right-5 z-50 animate-fade-in">
                    <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-bold text-white ${toast.type === 'success' ? 'bg-emerald-600 border-emerald-500' : 'bg-rose-600 border-rose-500'
                        }`}>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}

            {/* Main Core Form Card Container */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 space-y-6">

                {/* Workspace Greeting Header */}
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">Add Course Instructor</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Select a verified instructor to link their custom published quizzes with your student dashboard.
                    </p>
                </div>

                {/* Form Management Module Workspace Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">

                    {/* Read-Only Profile Identity Summary */}
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4a5fcd] text-sm font-black flex items-center justify-center">
                            {studentName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Your Profile Identity</span>
                            <h4 className="text-sm font-bold text-slate-800 leading-tight">{studentName}</h4>
                            {studentEmail && <p className="text-xs font-semibold text-slate-400 mt-0.5">{studentEmail}</p>}
                        </div>
                    </div>

                    <form onSubmit={handleAssignTeacher} className="space-y-6">

                        {/* Core Single Teacher Selector Menu Dropdown */}
                        <div>
                            <label htmlFor="teacher-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Choose Faculty Teacher
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                                <select
                                    id="teacher-select"
                                    value={selectedTeacher}
                                    required
                                    onChange={(e) => setSelectedTeacher(e.target.value)}
                                    className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-10 py-3.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select your course teacher target...</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.userId}>
                                            {teacher.fullName}
                                        </option>
                                    ))}
                                </select>
                                {/* Visual custom chevron indicator */}
                                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Action Bottom Operations Control Bar Grid */}
                        <div className="border-t border-slate-100 pt-5 flex items-center justify-center gap-4 flex-wrap">
                            <span className="text-xs text-slate-400 font-medium">
                                * Quizzes linked to this teacher will display on your dashboard instantly.
                            </span>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 bg-[#4a5fcd] hover:bg-[#3b4da6] disabled:bg-indigo-400 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none min-w-[150px]"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Linking...
                                    </span>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Add Teacher
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </main>
        </div>
    );
}