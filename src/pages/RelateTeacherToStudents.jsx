import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RelateTeacherToStudents() {
    // Operational States
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherObj, setSelectedTeacherObj] = useState(null);

    // Logged-in Student Identity parameters
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('Student');
    const [studentEmail, setStudentEmail] = useState('');

    // UI State Tracking
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const USERS_URL = import.meta.env.VITE_USERS_URL;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

    // 1. Fetch Teachers on Search Query Change
    useEffect(() => {
        if (!query.trim()) {
            setTeachers([]);
            return;
        }

        const fetchTeachersData = async (searchQuery) => {
            const storedAuth = localStorage.getItem('authData');
            let parsedData = {};
            if (storedAuth) {
                parsedData = JSON.parse(storedAuth);
            } else {
                window.dispatchEvent(new Event('storage'));
                navigate("/login");
                return;
            }
            try {
                const response = await fetch(
                    `${BASE_URL}/${USERS_URL}/teachers?page=1&perPage=10&searchQuery=${searchQuery}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${parsedData?.accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch teachers.');
                }
                const data = await response.json();
                setTeachers(data?.records || []);
            } catch (error) {
                console.error("Error fetching data repository streams:", error);
                triggerToast("Failed to initialize teacher listing variables.", "error");
            } finally {
                setIsLoading(false);
            }
        };

        const timeOut = setTimeout(() => {
            fetchTeachersData(query);
        }, 500);

        return () => clearTimeout(timeOut);
    }, [query]);

    // 2. Initial Load: Student Identity Setup
    useEffect(() => {
        const initializeComponent = async () => {
            setIsLoading(true);

            try {
                const storedAuth = localStorage.getItem('authData');
                if (storedAuth) {
                    const parsedData = JSON.parse(storedAuth);

                    let parsedDate = new Date(parsedData.expires);
                    let nowDate = Date.now();
                    if (nowDate > parsedDate) {
                        localStorage.removeItem('authData');
                        window.dispatchEvent(new Event('storage'));
                        navigate("/login");
                        return;
                    }

                    if (parsedData?.id) setStudentId(parsedData.id);
                    if (parsedData?.fullName) setStudentName(parsedData.fullName);
                    if (parsedData?.emailId) setStudentEmail(parsedData.emailId);
                } else {
                    window.dispatchEvent(new Event('storage'));
                    navigate("/login");
                }
            } catch (e) {
                console.error("Error fetching local student identity profiles:", e);
            } finally {
                setIsLoading(false);
            }
        };

        initializeComponent();
    }, []);

    // 3. Select Teacher Action
    const handleSelectTeacher = (teacher) => {
        setSelectedTeacherObj(teacher);
        setQuery(teacher.fullName || '');
        setShowDropdown(false);
    };

    // 4. Clear Selection
    const handleClearSelection = () => {
        setSelectedTeacherObj(null);
        setQuery('');
        setTeachers([]);
    };

    // 5. Form Submission Action
    const handleAssignTeacher = async (e) => {
        e.preventDefault();

        const storedAuth = localStorage.getItem('authData');
        let parsedData = {};

        if (storedAuth) {
            parsedData = JSON.parse(storedAuth);
            if (parsedData?.id) setStudentId(parsedData.id);
            if (parsedData?.fullName) setStudentName(parsedData.fullName);
            if (parsedData?.emailId) setStudentEmail(parsedData.emailId);
        } else {
            window.dispatchEvent(new Event('storage'));
            navigate("/login");
            return;
        }

        if (!selectedTeacherObj) {
            triggerToast("Please select an instructor to continue tracking.", "error");
            return;
        }

        setIsSubmitting(true);

        const payload = {
            teacherId: selectedTeacherObj.userId || selectedTeacherObj.id
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
                handleClearSelection();
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
                    <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-bold text-white ${toast.type === 'success' ? 'bg-emerald-600 border-emerald-500' : 'bg-rose-600 border-rose-500'}`}>
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

                        {/* Search Input Dropdown */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Choose Faculty Teacher
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    🔍
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search teacher..."
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setShowDropdown(true);
                                        if (selectedTeacherObj) {
                                            setSelectedTeacherObj(null);
                                        }
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                />

                                {showDropdown && teachers.length > 0 && (
                                    <div className="absolute z-20 mt-2 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                        {teachers.map((teacher) => (
                                            <div
                                                key={teacher.id || teacher.userId}
                                                onClick={() => handleSelectTeacher(teacher)}
                                                className="px-4 py-3 hover:bg-slate-100 cursor-pointer transition-colors"
                                            >
                                                <div className="font-semibold text-sm text-slate-800">{teacher.fullName}</div>
                                                {teacher.emailId && (
                                                    <div className="text-xs text-slate-400">{teacher.emailId}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Selected Teacher Details Card */}
                        {selectedTeacherObj && (
                            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-4 animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center">
                                            {selectedTeacherObj.fullName?.charAt(0).toUpperCase() || 'T'}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">{selectedTeacherObj.fullName}</h3>
                                            {selectedTeacherObj.emailId && (
                                                <p className="text-xs font-medium text-slate-500">{selectedTeacherObj.emailId}</p>
                                            )}
                                            {selectedTeacherObj.department && (
                                                <span className="inline-block mt-1 text-[10px] bg-indigo-100 text-[#4a5fcd] font-semibold px-2 py-0.5 rounded-md">
                                                    {selectedTeacherObj.department}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleClearSelection}
                                        className="text-xs text-slate-400 hover:text-slate-600 font-semibold underline"
                                    >
                                        Change
                                    </button>
                                </div>

                                <div className="border-t border-indigo-100/60 pt-4 flex flex-col items-center gap-3">
                                    <span className="text-xs text-slate-400 font-medium text-center">
                                        * Quizzes linked to this teacher will display on your dashboard instantly.
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-[#4a5fcd] hover:bg-[#3b4da6] disabled:bg-indigo-400 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none"
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
                            </div>
                        )}

                    </form>
                </div>

            </main>
        </div>
    );
}