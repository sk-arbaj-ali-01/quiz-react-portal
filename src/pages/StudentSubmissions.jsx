import React from 'react';

export default function StudentSubmissions() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-12">
      
      {/* Top Navigation Bar */}
      <nav className="bg-[#4a5fcd] text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-tight">QuizMaster</h1>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#dashboard" className="text-indigo-100 hover:text-white transition-colors">Dashboard</a>
            <a href="#my-quizzes" className="text-indigo-100 hover:text-white transition-colors">My Quizzes</a>
            <a href="#students" className="text-white border-b-2 border-white pb-3 -mb-3">Students</a>
            <a href="#reports" className="text-indigo-100 hover:text-white transition-colors">Reports</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-1.5 text-indigo-100 hover:text-white rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="p-1.5 text-indigo-100 hover:text-white rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-200">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" alt="Sarah Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <a href="#quizzes" className="hover:text-slate-600 transition-colors">Quizzes</a>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <a href="#biology" className="hover:text-slate-600 transition-colors">Biology 101</a>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-[#4a5fcd]">Submissions</span>
        </div>

        {/* Dashboard Title & Top Actions Grid */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Submissions: Weekly Biology Quiz</h2>
            <p className="text-slate-500 text-sm mt-1">
              Review student progress, grade pending responses, and analyze overall class performance for the Cellular Respiration module.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-center">
            <button className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              Export Results
            </button>
            <button className="inline-flex items-center gap-2 bg-[#4a5fcd] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#3b4da6] transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              Nudge Incomplete
            </button>
          </div>
        </div>

        {/* Analytic Cards Metric Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Students</span>
            <span className="text-3xl font-black text-slate-900 block mt-1">32</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Submitted</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-teal-600">28</span>
              <span className="text-slate-400 text-sm font-semibold">/ 32</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Score</span>
            <span className="text-3xl font-black text-[#4a5fcd] block mt-1">84%</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm border-l-4 border-amber-500">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pending Review</span>
            <span className="text-3xl font-black text-amber-600 block mt-1">4</span>
          </div>

        </div>

        {/* Central Data Workspace Matrix - Filter controls + Real Structured HTML Table */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Internal Filters & Search Row Header */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative flex-1 max-w-md">
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" /></svg>
              <input 
                type="text" 
                placeholder="Search student name..." 
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd]"
              />
            </div>
            
            <div className="flex items-center gap-1.5 self-end sm:self-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1.5">Filter:</span>
              <button className="bg-[#2e42a5] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">All</button>
              <button className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-50">Graded</button>
              <button className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-50">Pending</button>
              <button className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-50">Late</button>
            </div>
          </div>

          {/* Proper Structured Core HTML Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Student Name</th>
                  <th className="py-3.5 px-6">Submission Time</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Score</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                
                {/* Row 1 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-50 text-[#4a5fcd] font-bold text-xs flex items-center justify-center border border-indigo-100">
                        JD
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Jane Doe</h4>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">jane.doe@example.edu</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    Oct 24, 2023 <span className="text-slate-300 mx-1.5">•</span> 10:15 AM
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-teal-50 text-teal-700 border border-teal-100 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-700">
                    <span className="text-[#4a5fcd] text-base font-extrabold">92</span> / 100
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <a href="#review" className="text-sm font-bold text-[#4a5fcd] hover:underline inline-flex items-center gap-1">
                        Review
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                      </a>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center border border-teal-100">
                        MS
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Michael Smith</h4>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">m.smith@example.edu</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    Oct 24, 2023 <span className="text-slate-300 mx-1.5">•</span> 11:42 AM
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-amber-50 text-amber-700 border border-amber-100 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md">
                      Upcoming
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 italic font-semibold">
                    Grading Pending
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <a href="#grade" className="text-sm font-bold text-amber-600 hover:underline inline-flex items-center gap-1">
                        Grade Now
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                      </a>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" alt="Alice Profile" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Alice Wong</h4>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">a.wong@example.edu</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    Oct 23, 2023 <span className="text-slate-300 mx-1.5">•</span> 09:10 PM
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-teal-50 text-teal-700 border border-teal-100 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-700">
                    <span className="text-[#4a5fcd] text-base font-extrabold">78</span> / 100
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <a href="#review" className="text-sm font-bold text-[#4a5fcd] hover:underline inline-flex items-center gap-1">
                        Review
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                      </a>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200">
                        RB
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Robert Brown</h4>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">r.brown@example.edu</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    Oct 24, 2023 <span className="text-slate-300 mx-1.5">•</span> 08:30 AM
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md">
                      Submitted
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-700">
                    <span className="text-[#4a5fcd] text-base font-extrabold">85</span> / 100
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <a href="#review" className="text-sm font-bold text-[#4a5fcd] hover:underline inline-flex items-center gap-1">
                        Review
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                      </a>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination Control Deck */}
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Showing 1 to 4 of 28 submissions</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#2e42a5] text-white font-bold flex items-center justify-center shadow-sm">1</button>
              <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50">2</button>
              <button className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50">3</button>
              <span className="px-1 text-slate-300">...</span>
              <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Corporate Platform Footer Section */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
        <div>
          <span className="text-[#2e42a5] font-bold mr-1">QuizMaster</span> | EdTech Solution
          <p className="mt-1 font-medium text-[11px]">&copy; 2026 QuizMaster EdTech Solution. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-5 text-slate-500 font-medium">
          <a href="#support" className="hover:underline">Support</a>
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#accessibility" className="hover:underline">Accessibility</a>
          <a href="#terms" className="hover:underline">Terms</a>
        </div>
      </footer>

    </div>
  );
}