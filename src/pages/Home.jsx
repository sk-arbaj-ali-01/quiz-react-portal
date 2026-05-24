function Home() {
    return(
    <>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Welcome back, Professor Sarah.</h1>
                    <p className="text-slate-500 mt-1 text-sm sm:text-base">Monitor your current assessments and manage your student's progress from your centralized dashboard.</p>
                </div>
                <button className="inline-flex items-center justify-center bg-[#4355b4] hover:bg-[#374699] text-white font-medium text-sm px-5 py-3 rounded-xl shadow-sm transition-colors duration-200 self-start md:self-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    Create New Quiz
                </button>
            </div>

            <div className="grid grid-cols-1 mb-10">

                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-[#0f172a]">Weekly Overview</h2>
                        <span className="text-[11px] font-medium bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">Updated 5m ago</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Avg. Score</p>
                            <p className="text-3xl font-bold text-[#31439c] mb-2">84%</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0f766e] h-full rounded-full" style={{width: '84%'}}></div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Participation</p>
                            <p className="text-3xl font-bold text-[#31439c] mb-2">92%</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0f766e] h-full rounded-full" style={{width: '92%'}}></div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Quizzes Ran</p>
                            <p className="text-3xl font-bold text-[#31439c] mb-1">12</p>
                            <p className="text-xs font-medium text-[#0f766e] flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" /></svg>
                                +3 from last week
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">Ongoing Quizzes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="relative h-48 w-full bg-gradient-to-br from-emerald-800 to-teal-900 overflow-hidden">
                            <div className="absolute w-44 h-44 bg-emerald-600/30 rounded-full blur-xl top-4 left-6"></div>
                            <div className="absolute w-32 h-32 bg-teal-500/40 rounded-full blur-lg bottom-2 right-8"></div>
                            <span className="absolute top-4 left-4 bg-[#115e59] text-[10px] font-bold text-emerald-100 tracking-wider uppercase px-2.5 py-1 rounded-md">
                                Active
                            </span>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-[#0f172a] mb-1">Weekly Biology Quiz</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Cellular respiration and photosynthetic pathways.</p>
                        </div>
                    </div>

                    <div className="p-5 pt-0 mt-auto">
                        <div className="mb-4">
                            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                                <span>48/60 Students Joined</span>
                                <span className="text-emerald-700">80%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0f766e] h-full rounded-full" style={{width: '80%'}}></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
                            <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                15m left
                            </span>
                            <a href="#" className="text-[#31439c] font-semibold hover:underline">Monitor Live</a>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="relative h-48 w-full bg-[#0b1b2b] overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                            <div className="absolute w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl"></div>
                            <div className="w-full h-[1px] bg-cyan-400/40 relative top-24 shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                            <span className="absolute top-4 left-4 bg-[#1e293b]/60 backdrop-blur-sm text-[10px] font-bold text-slate-200 tracking-wider uppercase px-2.5 py-1 rounded-md">
                                Upcoming
                            </span>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-[#0f172a] mb-1">Advanced Calculus</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Integrals of trigonometric functions and series convergence.</p>
                        </div>
                    </div>

                    <div className="p-5 pt-0 mt-auto">
                        <div className="bg-[#eef2ff] rounded-xl p-3 flex items-center gap-3.5 mb-4">
                            <div className="bg-[#4355b4] text-white rounded-lg p-2 text-center min-w-[45px]">
                                <span className="block text-[10px] uppercase font-bold leading-none tracking-wider opacity-80">Oct</span>
                                <span className="block text-lg font-bold leading-none mt-0.5">24</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#1e293b]">Scheduled for 09:00 AM</p>
                                <p className="text-[11px] text-slate-500 font-medium">Estimated duration: 90m</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
                            <button className="text-slate-600 font-semibold hover:text-slate-900 inline-flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                                Edit Quiz
                            </button>
                            <button className="text-[#31439c] font-semibold hover:underline">Set Reminders</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="relative h-48 w-full bg-gradient-to-tr from-[#1e1610] to-[#3a2d23] overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-amber-950/40 blur-md"></div>
                            <div className="absolute right-12 top-8 w-6 h-12 bg-amber-200/40 rounded-full blur-xl"></div>
                            <div className="absolute right-14 top-12 w-2 h-4 bg-amber-100 rounded-full"></div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-[#0f172a] mb-1">Literature 101</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Analysis of Victorian-era narrative structures and themes.</p>
                        </div>
                    </div>

                    <div className="p-5 pt-0 mt-auto">
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-[#eef2ff] rounded-xl p-2.5 text-center">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Submissions</p>
                                <p className="text-lg font-bold text-[#31439c]">58/60</p>
                            </div>
                            <div className="bg-[#eef2ff] rounded-xl p-2.5 text-center">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">className Avg.</p>
                                <p className="text-lg font-bold text-[#31439c]">76%</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
                            <button className="bg-[#e2f0ec] hover:bg-[#d1e7e0] text-[#0f766e] font-semibold px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" /></svg>
                                View Results
                            </button>
                            <button className="text-slate-400 hover:text-slate-600 p-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </>);
}

export default Home;