import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[80vh] bg-[#f8fafc] text-[#1e293b] font-sans antialiased flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Welcome Platform Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="bg-indigo-50 text-[#4a5fcd] font-bold text-xs tracking-wider uppercase px-3 py-1 rounded-full border border-indigo-100">
          Academic Assessment Platform
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Welcome to <span className="text-[#4a5fcd]">QuizMaster</span>
        </h1>
        <p className="text-slate-500 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          A clean, efficient learning assessment system designed to streamline examination setups, answer submission collections, and rapid evaluation tools for both educators and students.
        </p>
        
        {/* Main Strategic Portal Gateway CTAs */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/login"
            className="bg-[#4a5fcd] hover:bg-[#3b4da6] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In to Account
          </Link>
          <Link
            to="/register"
            className="bg-white border border-slate-200 text-slate-700 font-bold text-sm px-6 py-3 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
          >
            Create New Account
          </Link>
        </div>
      </div>

      {/* Feature Architecture Matrix Blocks Grid */}
      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        {/* Profile Card 1: For Students */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L11.25 15.8a.75.75 0 00.9 0l6.99-5.625m-15.75 0A3.75 3.75 0 017.5 6h9a3.75 3.75 0 013.75 3.75M4.26 10.174A2.25 2.25 0 014.5 12v6.75A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V12a2.25 2.25 0 01.24-1.826" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Student Workspace</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed flex-grow">
            Access customized dashboard streams to check active examinations, submit multi-format answers cleanly, and review point scoring evaluation records.
          </p>
        </div>

        {/* Profile Card 2: For Instructors */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4a5fcd]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Instructor Controls</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed flex-grow">
            Configure various questions (MCQs, MSQs, True/False) and review text-based short responses using built-in evaluation workflows.
          </p>
        </div>

        {/* Profile Card 3: Metrics & Analytics */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Performance Analytics</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed flex-grow">
            Track evaluation statistics instantly with complete summary matrices, structured results tables, and direct exports for institutional records.
          </p>
        </div>

      </div>

    </div>
  );
}