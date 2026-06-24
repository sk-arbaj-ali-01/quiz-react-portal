import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const [teacherName, setTeacherName] = useState('Professor');
  const [teacherEmail, setTeacherEmail] = useState('faculty@university.edu');

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('authData');
      if (storedAuth) {
        const parsedData = JSON.parse(storedAuth);
        if (parsedData?.fullName) setTeacherName(parsedData.fullName);
        if (parsedData?.emailId) setTeacherEmail(parsedData.emailId);
      }
    } catch (e) {
      console.error("Failed to recover teacher profile parameters:", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-12">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Profile Banner & Top Action Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          
          {/* Welcome Message Cluster */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100 text-[#4a5fcd] text-xl font-black flex items-center justify-center shadow-inner">
              {teacherName.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4a5fcd] block">Faculty Control Panel</span>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">Welcome back, {teacherName}!</h2>
              <p className="text-sm font-semibold text-slate-400 mt-0.5">{teacherEmail}</p>
            </div>
          </div>

          {/* Top Right: Create New Quiz Button Link */}
          <div className="self-start md:self-center border-t md:border-t-0 border-slate-50 pt-3 md:pt-0 w-full md:w-auto flex justify-end">
            <Link
              to="/quiz-management"
              className="inline-flex items-center gap-2 bg-[#4a5fcd] hover:bg-[#3b4da6] text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full md:w-auto justify-center"
            >
              <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Create New Quiz</span>
            </Link>
          </div>

        </div>

        {/* Dashboard Created Content Segment Grid */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Your Created Quizzes</h3>
            <p className="text-sm font-medium text-slate-400 mt-0.5">Manage existing course criteria, analyze submissions, or change access constraints.</p>
          </div>

          {/* Core Created Quiz Card Module Row */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row max-w-4xl">
            
            {/* Left Image Accent Container Layout */}
            <div className="md:w-64 bg-slate-100 relative h-44 md:h-auto min-h-[160px] flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600" 
                alt="Web Development Architecture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-900/95 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm border border-slate-700">
                CS-302
              </div>
            </div>

            {/* Right Meta Workstation Layout */}
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              
              {/* Context Block Headers */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                    Accepting Responses
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Modified 2 days ago</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 leading-snug">
                  Midterm Assessment: Full-Stack Web Architecture & RESTful APIs
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Evaluates client-server structural workflows, asynchronous network middleware configuration parameters, data isolation states, and relational ORM query mapping models.
                </p>
              </div>

              {/* Technical Metrics Metadata Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-5 text-xs text-slate-500 font-bold">
                  {/* Duration Parameter */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Time limit: <span className="text-slate-800">60 Mins</span></span>
                  </div>

                  {/* Grading Point System Parameter */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408l1.5-1.525m-1.5 1.525l-1.5-1.525m1.5 1.525V13.5m0-4.5h.008v.008H12V9z" />
                    </svg>
                    <span>Total Weight: <span className="text-slate-800">100 Pts</span></span>
                  </div>

                  {/* Submission Counter Tracking Parameter */}
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A4.61 4.61 0 0114.5 21h-5a4.61 4.61 0 01-.5-1.766v-.106m0-3.583a9.37 9.37 0 01-.393-.563m-.084-2.497a3.56 3.56 0 00-.518-.445m.533 3.505a4.125 4.125 0 01-7.533-2.493c0-.832.246-1.607.671-2.257m0 0a3.56 3.56 0 012.683-1.404M12 9a4 4 0 100-8 4 4 0 000 8zm0 0v1.306c0 .592-.19 1.167-.541 1.645L10 16.242V19.13" />
                    </svg>
                    <span>Submissions: <span className="text-[#4a5fcd] font-black">42 Submits</span></span>
                  </div>
                </div>

                {/* Sub-routing Call To Action Control Triggers */}
                <div className="flex items-center gap-2">
                  <Link
                    to="/quiz/edit/cs302-mid"
                    className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    Edit Layout
                  </Link>
                  <Link
                    to="/quiz/grades/cs302-mid"
                    className="inline-flex items-center gap-1 bg-indigo-50 hover:bg-[#4a5fcd] text-[#4a5fcd] hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                  >
                    <span>View Submissions</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}