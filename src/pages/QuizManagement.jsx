import { useState } from "react";

function QuizManagement()
{
    const [toggleModal, setToggleModal] = useState(false);

    return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen" x-data="{ openModal: false }">
  
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Quiz Management</h1>
      <p className="text-slate-500 mt-1 text-sm sm:text-base max-w-2xl">Manage your curriculum assessments, monitor real-time student submissions, and analyze performance data across all your active courses.</p>
    </div>
    <button 
    onClick={() => setToggleModal(true)}
    className="inline-flex items-center justify-center bg-[#4355b4] hover:bg-[#374699] text-white font-medium text-sm px-5 py-3 rounded-xl shadow-sm transition-colors duration-200 self-start md:self-center gap-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
      Create New Quiz
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    <div className="bg-[#f0f4ff]/60 border border-[#e2eaff] rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Total Quizzes</p>
      <p className="text-4xl font-extrabold text-[#31439c]">24</p>
    </div>
    <div className="bg-[#f0fbf7]/70 border border-[#e0f5ed] rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Active Today</p>
      <p className="text-4xl font-extrabold text-[#0f766e]">8</p>
    </div>
    <div className="bg-[#f5f3ff]/60 border border-[#ebe5ff] rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Total Submissions</p>
      <p className="text-4xl font-extrabold text-[#4f46e5]">1,402</p>
    </div>
    <div className="bg-[#fffbeb]/70 border border-[#fef3c7] rounded-2xl p-6 shadow-sm">
      <p className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">Avg. Score</p>
      <p className="text-4xl font-extrabold text-[#b45309]">78%</p>
    </div>
  </div>

  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f8fafc]/80 border-b border-slate-100 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
            <th className="py-4 px-6 min-w-[280px]">Title</th>
            <th className="py-4 px-6">Date Created</th>
            <th className="py-4 px-6 min-w-[180px]">Submissions</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-4 px-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#4355b4] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244c0 .414.336.75.75.75h3c.414 0 .75-.336.75-.75V3.104m-5.25 0a.75.75 0 01.356-.63l1.5-1a.75.75 0 01.788 0l1.5 1a.75.75 0 01.356.63m-5.25 0h5.25M9 7.5h6M9 10.5h6M9 13.5h6m3 3v3a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 015 19.5v-3m14 0V9a1.5 1.5 0 00-1.5-1.5h-11A1.5 1.5 0 005 9v7.5m14 0H5"/></svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 leading-tight">Weekly Biology Quiz: Cell Structure</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Biology 101 • Grade 10</p>
              </div>
            </td>
            <td className="py-4 px-6 text-slate-500 font-medium">Oct 12, 2023</td>
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <span className="text-slate-700 font-semibold text-xs w-10">42/45</span>
                <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0f766e] h-full rounded-full" style={{width: "93.3%"}}></div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center bg-[#0f766e] text-[10px] font-extrabold text-emerald-50 tracking-wider uppercase px-2.5 py-1 rounded-md">Active</span>
            </td>
            <td className="py-4 px-6 text-right">
              <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/></svg>
              </button>
            </td>
          </tr>
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-4 px-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#b45309] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 leading-tight">Modern History: World War II Overview</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">History • Grade 11</p>
              </div>
            </td>
            <td className="py-4 px-6 text-slate-500 font-medium">Oct 10, 2023</td>
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <span className="text-slate-700 font-semibold text-xs w-10">12/38</span>
                <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4355b4] h-full rounded-full" style={{width: "31.5%"}}></div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center bg-[#eef2ff] text-[10px] font-extrabold text-[#4355b4] tracking-wider uppercase px-2.5 py-1 rounded-md">Upcoming</span>
            </td>
            <td className="py-4 px-6 text-right">
              <div class="flex items-center justify-center gap-2">
                <button class="p-2 text-slate-500 hover:text-[#4355b4] hover:bg-indigo-50 rounded-xl transition-all duration-200" title="Edit Quiz">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>
                </button>
                <button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200" title="Delete Quiz">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                </button>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-4 px-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#31439c] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-3-3V18m-3-3V18m3-15h.008v.008H12V3zm0 3h.008v.008H12V6zm0 3h.008v.008H12V9zm-3 3h.008v.008H9V12zm0 3h.008v.008H9v-.008zm-3-6h.008v.008H6V9zm0 3h.008v.008H6V12zm0 3h.008v.008H6v-.008zm9-3h.008v.008H15V12zm0 3h.008v.008H15v-.008zm3-6h.008v.008H18V9zm0 3h.008v.008H18V12zm0 3h.008v.008H18v-.008zM4.5 21h15a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0019.5 3h-15A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21z"/></svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 leading-tight">Algebraic Foundations: Quadratic Equations</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Mathematics • Grade 9</p>
              </div>
            </td>
            <td className="py-4 px-6 text-slate-500 font-medium">Oct 05, 2023</td>
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <span className="text-slate-700 font-semibold text-xs w-10">32/32</span>
                <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-300 h-full rounded-full" style={{width: "100%"}}></div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center bg-slate-100 text-[10px] font-extrabold text-slate-500 tracking-wider uppercase px-2.5 py-1 rounded-md">Submitted</span>
            </td>
            <td className="py-4 px-6 text-right">
              <div class="flex items-center justify-center gap-2">
                <button class="p-2 text-slate-500 hover:text-[#4355b4] hover:bg-indigo-50 rounded-xl transition-all duration-200" title="Edit Quiz">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>
                </button>
                <button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200" title="Delete Quiz">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                </button>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="py-4 px-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0f766e] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 leading-tight">Intro to Cognitive Psychology</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Social Sciences • Grade 12</p>
              </div>
            </td>
            <td className="py-4 px-6 text-slate-500 font-medium">Sep 28, 2023</td>
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <span className="text-slate-700 font-semibold text-xs w-10">45/45</span>
                <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-300 h-full rounded-full" style={{width: "100%"}}></div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <span className="inline-flex items-center bg-slate-100 text-[10px] font-extrabold text-slate-500 tracking-wider uppercase px-2.5 py-1 rounded-md">Submitted</span>
            </td>
            <td className="py-4 px-6 text-right">
              <div class="flex items-center justify-center gap-2">
                <button class="p-2 text-slate-500 hover:text-[#4355b4] hover:bg-indigo-50 rounded-xl transition-all duration-200" title="Edit Quiz">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/></svg>
                </button>
                <button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200" title="Delete Quiz">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="bg-slate-50/70 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-xs font-semibold text-slate-500">Showing 4 of 24 quizzes</span>
      <div className="flex items-center gap-1.5">
        <button className="p-1.5 rounded-lg text-slate-300 cursor-not-allowed" disabled>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
        </button>
        <button className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-[#31439c] text-white text-xs font-bold shadow-sm">1</button>
        <button className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors">2</button>
        <button className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors">3</button>
        <span className="text-slate-400 text-xs font-medium px-1">...</span>
        <button className="w-7 h-7 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors">6</button>
        <button className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
        </button>
      </div>
    </div>
  </div>

  { toggleModal && <div 
    x-show="openModal" 
    className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    x-transition:enter="ease-out duration-300"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="ease-in duration-200"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-95"
    x-cloak
  >
    <div  className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-lg font-bold text-slate-900">Create New Quiz</h3>
        <button 
        onClick={() => setToggleModal(false)}
        className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <form className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Quiz Title</label>
          <input type="text" placeholder="e.g. Organic Chemistry Foundations" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Subject</label>
            <input type="text" placeholder="e.g. Science" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Grade Level</label>
            <input type="text" placeholder="e.g. Grade 11" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#4355b4] focus:ring-1 focus:ring-[#4355b4]" />
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={() => setToggleModal(false)} type="button" className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors">Cancel</button>
          <button type="submit" className="bg-[#4355b4] hover:bg-[#374699] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">Save & Draft</button>
        </div>
      </form>
    </div>
  </div> }

</div>
    </>);
}

export default QuizManagement;