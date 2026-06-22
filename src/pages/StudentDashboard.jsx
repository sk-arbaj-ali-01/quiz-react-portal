import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState('Student');
  const [studentEmail, setStudentEmail] = useState('student@university.edu');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('authData');
      if (storedAuth) {
        const parsedData = JSON.parse(storedAuth);
        // Fallback checks to populate fields gracefully if names exist in storage
        if (parsedData?.fullName) setStudentName(parsedData.fullName);
        if (parsedData?.emailId) setStudentEmail(parsedData.emailId);
      }
      else{
        navigate("/login");
      }
    } catch (e) {
      console.error("Failed to recover profile parameters:", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-12">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Student Profile Identity Card Segment */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100 text-[#4a5fcd] text-xl font-black flex items-center justify-center shadow-inner">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Logged In Student</span>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{studentName}</h2>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">{studentEmail}</p>
            </div>
          </div>
          
          {/* Quick Academic Meta Badges */}
          <div className="flex items-center gap-3 self-start sm:self-center border-t sm:border-t-0 border-slate-50 pt-3 sm:pt-0 w-full sm:w-auto">
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 text-center min-w-[90px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Status</span>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block mt-0.5">Active</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 text-center min-w-[90px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Completed</span>
              <span className="text-sm font-black text-slate-800 block mt-0.5">14 Tests</span>
            </div>
          </div>
        </div>

        {/* Available Quizzes Title and Grid Segment */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Available Quizzes</h3>
            <p className="text-sm font-medium text-slate-400 mt-0.5">Assessments ready to be taken. Ensure your internet connection is stable before beginning.</p>
          </div>

          {/* Core Quiz Module Workspace Matrix Card */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row max-w-4xl">
            
            {/* Left Wing Quiz Cover Image Layer */}
            <div className="md:w-64 bg-slate-100 relative h-44 md:h-auto min-h-[160px] flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9d39d6618?auto=format&fit=crop&q=80&w=600" 
                alt="Cellular Biology Exam Artwork" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-indigo-600/95 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                Biology 101
              </div>
            </div>

            {/* Right Wing Quiz Metadata & Interaction Workspace Block */}
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-slate-900 leading-snug hover:text-[#4a5fcd] transition-colors cursor-pointer">
                  Weekly Biology Quiz: Cellular Respiration Cycles
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Covers ATP energy currency mechanics, glycolysis transitions, mitochondrial matrix systems, and terminal electron acceptor networks. Review chapter 4 materials completely before starting your single allowed attempt session.
                </p>
              </div>

              {/* Technical Metrics Deck Container */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-6 text-xs text-slate-500 font-bold">
                  {/* Exam Duration Node */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Duration: <span className="text-slate-800 font-black">45 Mins</span></span>
                  </div>

                  {/* Total Marks Node */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408l1.5-1.525m-1.5 1.525l-1.5-1.525m1.5 1.525V13.5m0-4.5h.008v.008H12V9z" />
                    </svg>
                    <span>Total Marks: <span className="text-[#4a5fcd] font-black">100 Pts</span></span>
                  </div>
                </div>

                {/* Attempt Action Route Redirection Link Button */}
                <Link
                  to="/quiz/attempt/b101-weekly"
                  className="inline-flex items-center gap-1.5 bg-[#4a5fcd] hover:bg-[#3b4da6] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Attempt Quiz</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6-6 6m6-6H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}