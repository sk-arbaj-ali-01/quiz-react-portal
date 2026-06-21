import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SIGN_IN_URL = import.meta.env.VITE_SIGN_IN_URL || '/api/v1/users/login';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        const formData = new FormData(event.currentTarget);
        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        setIsLoading(true);

        try {
            const response = await fetch(SIGN_IN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 200) {
                const contentType = response.headers.get('content-type') || '';
                const data = contentType.includes('application/json')
                    ? await response.json()
                    : await response.text();

                localStorage.setItem('authData', JSON.stringify(data));
                window.dispatchEvent(new Event('storage'));
                navigate("/");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            {/* Top Brand Logo / Title Section */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h1 className="text-3xl font-black tracking-tight text-[#4a5fcd]">QuizMaster</h1>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">Sign in to your account</h2>
            </div>

            {/* Main Form Interactive Card */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 border border-slate-100 shadow-sm sm:rounded-2xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Email Address Input Block */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="name@university.edu"
                                    className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input Block */}
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
                                    autoComplete="current-password"
                                    required
                                    placeholder="��������"
                                    className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] transition-all"
                                />
                            </div>
                        </div>

                        {/* Utility Toggles Row (Remember me / Forgot password) */}
                        {/*<div className="flex items-center justify-between text-xs sm:text-sm font-semibold">*/}
                        {/*    <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">*/}
                        {/*        <input*/}
                        {/*            id="remember-me"*/}
                        {/*            name="remember-me"*/}
                        {/*            type="checkbox"*/}
                        {/*            className="w-4 h-4 text-[#4a5fcd] focus:ring-[#4a5fcd] border-slate-300 rounded"*/}
                        {/*        />*/}
                        {/*        <span>Remember me</span>*/}
                        {/*    </label>*/}

                        {/*    <a href="#forgot" className="text-[#4a5fcd] hover:underline">*/}
                        {/*        Forgot password?*/}
                        {/*    </a>*/}
                        {/*</div>*/}

                        {/* Call To Action Submit Action Grid */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex items-center justify-center gap-2 bg-[#4a5fcd] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#3b4da6] hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'}`}
                            >
                                {isLoading && (
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                )}
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>

                    </form>

                    {/* Institutional Single Sign-On Integration Split Divider */}
                    {/* 
                    <div className="mt-6">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-full border-t border-slate-100"></div>
                            <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Or Institutional Sign In
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3">
                            <button className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-slate-200 bg-white rounded-xl shadow-sm text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                                </svg>
                                Continue with Google Workspace
                            </button>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
}