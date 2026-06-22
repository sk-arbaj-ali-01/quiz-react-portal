import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  // UI Toast and submission state variables tracking
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Helper utility to programmatically invoke short-lived visual toast alerts
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Central submission interceptor converting parameters into exact server-side targets
  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('full_name');
    const emailId = formData.get('email_id');
    const password = formData.get('password');
    const rawRole = formData.get('role');

    // Enforcing strict matching backend DTO constraints: TEACHER vs STUDENT
    const mappedRole = rawRole === 'professor' ? 'TEACHER' : 'STUDENT';

    const payload = {
      fullName,
      emailId,
      password,
      role: mappedRole
    };

    try {
      const URL =  import.meta.env.VITE_USERS_URL || '/api/v1/users';
      
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Target explicit 201 Created execution pattern successfully
      if (response.status === 201) {
        triggerToast('Account successfully created! Redirecting to login...', 'success');
        
        // Brief simulated timeout to let the user visually digest the success toast notice
        setTimeout(() => {
          navigate('/login'); // Updates location path pointer
        }, 2000);
        return;
      }

      // Handle unexpected fallback responses smoothly
      if (!response.ok) {
        throw new Error(`Server execution failure with status code: ${response.status}`);
      }
      if(response.status === 401)
        throw new Error(`You are not authenticated. Please login again: ${response.status}`);
      
      if(response.status === 403)
        throw new Error(`You are not authorized to access the resource: ${response.status}`);

    } catch (error) {
      console.error('Registration processing failed:', error);
      triggerToast(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      
      {/* Dynamic Overlay Floating Toast Alerts Section */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-bold text-white transition-all ${
            toast.type === 'success' 
              ? 'bg-emerald-600 border-emerald-500' 
              : 'bg-rose-600 border-rose-500'
          }`}>
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Corporate Platform Headline Deck */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-3xl font-black tracking-tight text-[#4a5fcd]">QuizMaster</h1>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="login" className="font-bold text-[#4a5fcd] hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>

      {/* Structural Data Matrix Card Block */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-slate-100 shadow-sm sm:rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleRegistrationSubmit}>
            
            {/* Full Name Input Box Container -> full_name */}
            <div>
              <label htmlFor="full_name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] transition-all"
                />
              </div>
            </div>

            {/* Email Address Form Node Segment -> email_id */}
            <div>
              <label htmlFor="email_id" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input
                  id="email_id"
                  name="email_id"
                  type="email"
                  required
                  placeholder="name@university.edu"
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] transition-all"
                />
              </div>
            </div>

            {/* Password Node Element -> password */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v-6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] transition-all"
                />
              </div>
            </div>

            {/* Account Role Dropdown -> role */}
            <div>
              <label htmlFor="role" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Account Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 11.063 1.34l-.042.02a.75.75 0 01-.063-1.34zM12 4.5V3m0 18v-1.5m9-7.5h-1.5M3 12H1.5m17.036-6.036l-1.06 1.06M6.036 17.964l-1.06 1.06m12.06 0l1.06 1.06M6.036 6.036l1.06-1.06M12 9a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </div>
                <select
                  id="role"
                  name="role"
                  required
                  defaultValue=""
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-10 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select your account type...</option>
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Call To Action Form Trigger Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center bg-[#4a5fcd] hover:bg-[#3b4da6] disabled:bg-indigo-400 text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Register Account'
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}