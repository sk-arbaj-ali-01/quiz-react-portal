import React, { useState, useEffect } from 'react';
import useHandleFetch from '../Utilities/useHandleFetch';
import UnAuthenticatedException from '../Exceptions/UnAuthenticatedException';

export default function StudentQuizHistory() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleFetch = useHandleFetch();
  const STUDENT_URL = import.meta.env.VITE_STUDENTS_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchHistoryData = async () => {
      setIsLoading(true);
      
      handleFetch(async () => {
        const storedAuth = localStorage.getItem('authData');
        const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;
        const studentId = parsedAuth?.id || "CURRENT_USER";

        // Query historical attempt logs from backend
        const response = await fetch(`${BASE_URL}/${STUDENT_URL}/attempted-quizzes`,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${parsedAuth.accessToken}`
            }
        });
        if (!response.ok) throw new Error('Network logging error');
        if (response.status === 401) throw new UnAuthenticatedException('Please login to check quiz history.');
        
        const data = await response.json();
        setRecords(data);
      }, 
      () => setIsLoading(false)
    )
    };

    fetchHistoryData();
  }, []);

  // Helper utility function to format backend timestamp configurations cleanly
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
          <svg className="animate-spin h-5 w-5 text-[#4a5fcd]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Compiling Assessment Performance History...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-16">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
        
        {/* Header Metadata Deck */}
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Your Exam Performance Logs</h2>
          <p className="text-slate-500 text-sm mt-1">
            Review your submitted assessments, grading feedback timelines, and verify your unlocked certificates.
          </p>
        </div>

        {/* Structural Table Container Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Table Headers Setup */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Quiz Name</th>
                  <th className="px-6 py-4">Date Attempted</th>
                  <th className="px-6 py-4">Obtained Score</th>
                  <th className="px-6 py-4">Evaluation Status</th>
                  <th className="px-6 py-4 text-right">Academic Actions</th>
                </tr>
              </thead>

              {/* Table Body Content Matrix mapping */}
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638" />
                          </svg>
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-slate-800">No attempts logged</h4>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            You haven't submitted any evaluation items yet.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.groupId} className="hover:bg-slate-50/50 transition-colors">
                      
                      {/* 1. Quiz Title */}
                      <td className="px-6 py-4 max-w-xs sm:max-w-md">
                        <div className="font-bold text-slate-800 truncate" title={record.groupName}>
                          {record.groupName}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">ID: {record.groupId}</span>
                      </td>

                      {/* 2. Date Attempted */}
                      {/* <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {formatDate(record.attemptedDate)}
                      </td> */}

                      {/* 3. Score Tracker Row Element */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.underReview === true ? (
                          <span className="text-slate-400 font-semibold italic text-xs">Awaiting Grade</span>
                        ) : (
                          <div className="text-sm font-black text-slate-800">
                            {record.marksObtained} <span className="text-xs text-slate-400 font-bold">/ {record.totalPoints} Pts</span>
                          </div>
                        )}
                      </td>

                      {/* 4. Conditional Evaluation Status Badge Section */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.underReview === true ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                            Under Review
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Review Complete
                          </span>
                        )}
                      </td>

                      {/* 5. Right Action: Certificate Download Anchor Trigger Context */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        {record.underReview === false ? (
                          <a
                            href={`/api/certificates/download/${record.certificateId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4a5fcd] hover:text-[#3b4da6] bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition-all"
                          >
                            <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m0 0l-3-3m3 3l3-3m-12 1h18a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2z" />
                            </svg>
                            <span>Download Certificate</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl cursor-not-allowed select-none"
                          >
                            <svg className="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            <span>Locked Until Review</span>
                          </button>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </main>
    </div>
  );
}