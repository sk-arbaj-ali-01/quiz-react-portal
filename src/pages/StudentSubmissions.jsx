import { useEffect, useState } from 'react';
import useHandleFetch from '../Utilities/useHandleFetch';
import UnAuthenticatedException from '../Exceptions/UnAuthenticatedException';
import UnAuthorizedException from '../Exceptions/UnAuthorizedException';

export default function StudentSubmissions() {

  const [reviewData, setReviewData] = useState([]);
  const [authData, setAuthData] = useState(null);
  const handleFetch = useHandleFetch();
  const TEACHER_URL = import.meta.env.VITE_TEACHER_URL;

  useEffect(() => {

    let storedAuthData = localStorage.getItem("authData");
    let parsedData = JSON.parse(storedAuthData);
    setAuthData(parsedData);

    handleFetch(async () => {
      let response = await fetch(`${TEACHER_URL}/review`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedData.accessToken}`
        }
      });
      let data = await response.json();

      if (response.ok) setReviewData(data);

      if (response.status === 401) throw new UnAuthenticatedException("Please login to check review page");
      if (response.status === 403) throw new UnAuthorizedException("You have no permission to access the resource");

      if (!response.ok) throw new Error(data.message);
    });

  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-12">

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

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
                  <th className="py-3.5 px-6">Score</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">

                {reviewData.map(item => (
                  <tr className="hover:bg-slate-50/50 transition-colors" key={item.studentId}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-9 h-9 rounded-full bg-indigo-50 text-[#4a5fcd] font-bold text-xs flex items-center justify-center border border-indigo-100">
                          JD
                        </div> */}
                        <div>
                          <h4 className="font-bold text-slate-800">{item.fullName}</h4>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">jane.doe@example.edu</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 font-bold text-slate-700">
                      <span className="text-[#4a5fcd] text-base font-extrabold">{item.totalPoints}</span>
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
                ))}


              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination Control Deck */}
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center text-xs font-semibold text-slate-400">
            {/* <span>Showing 1 to 4 of 28 submissions</span> */}
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>

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

    </div >
  );
}