import React from 'react';

export default function StudentSubmissionReview() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-16">
      
      {/* Top Sticky Navigation Bar */}
      <nav className="bg-[#4a5fcd] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-tight">QuizMaster</h1>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-indigo-100">
            <a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#my-quizzes" className="hover:text-white transition-colors">My Quizzes</a>
            <a href="#students" className="text-white border-b-2 border-white pb-3.5 -mb-3.5">Students</a>
            <a href="#reports" className="hover:text-white transition-colors">Reports</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-200">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" alt="Sarah Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Workspace Frame */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Breadcrumb Navigation Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <a href="#students" className="hover:text-slate-600 transition-colors">Students</a>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <a href="#submissions" className="hover:text-slate-600 transition-colors">Weekly Biology Quiz</a>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-[#4a5fcd]">Review Submission</span>
        </div>

        {/* Global Dashboard Workspace Control Deck */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Submission Review: Jane Doe</h2>
              <span className="bg-amber-50 text-amber-700 border border-amber-100 font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-md mt-0.5">
                Pending Review
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              Quiz: <span className="font-semibold text-slate-700">Weekly Biology Quiz: Cell Structure</span> • Submitted Oct 24, 2023
            </p>
          </div>
          
          {/* Top Right Call To Action Submission Button */}
          <button className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition-all self-start sm:self-center transform hover:-translate-y-0.5 active:translate-y-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Submit Review
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CARD 1: MCQ READ-ONLY CARD                                              */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-500 font-bold text-xs px-2.5 py-1 rounded-md">Question 01</span>
              <span className="bg-indigo-50 text-[#4a5fcd] font-bold text-xs px-2.5 py-1 rounded-md">MCQ</span>
            </div>
            <div className="text-right text-emerald-600 font-bold text-sm flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              5 / 5 Points
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            Which organelle is primarily responsible for protein synthesis in the eukaryotic cell?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Option A (Chosen & Correct) */}
            <div className="flex items-center justify-between bg-emerald-50/50 border-2 border-emerald-500 text-emerald-950 font-semibold rounded-xl px-4 py-3.5 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</div>
                <span>Ribosome</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500 text-white px-2 py-0.5 rounded">Student's Choice</span>
            </div>

            {/* Option B */}
            <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-200/60 text-slate-400 font-medium rounded-xl px-4 py-3.5 text-sm pointer-events-none">
              <div className="w-5 h-5 rounded-full border border-slate-300"></div>
              <span>Mitochondria</span>
            </div>

            {/* Option C */}
            <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-200/60 text-slate-400 font-medium rounded-xl px-4 py-3.5 text-sm pointer-events-none">
              <div className="w-5 h-5 rounded-full border border-slate-300"></div>
              <span>Golgi Apparatus</span>
            </div>

            {/* Option D */}
            <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-200/60 text-slate-400 font-medium rounded-xl px-4 py-3.5 text-sm pointer-events-none">
              <div className="w-5 h-5 rounded-full border border-slate-300"></div>
              <span>Lysosome</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: MSQ READ-ONLY CARD                                              */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-500 font-bold text-xs px-2.5 py-1 rounded-md">Question 02</span>
              <span className="bg-indigo-50 text-[#4a5fcd] font-bold text-xs px-2.5 py-1 rounded-md">Multiple Selection</span>
            </div>
            <div className="text-right text-rose-600 font-bold text-sm flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              0 / 10 Points
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            Select all components found within the nucleus of a cell.
          </h3>

          <div className="space-y-2.5 pt-2">
            {/* Option 1: Was Correct, But Student Missed It */}
            <div className="flex items-center justify-between bg-white border-2 border-emerald-500/50 border-dashed text-slate-700 font-semibold rounded-xl px-4 py-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-xs font-black">✓</div>
                <span>Nucleolus</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Correct Answer</span>
            </div>

            {/* Option 2: Correct & Student Selected It */}
            <div className="flex items-center justify-between bg-emerald-50/50 border-2 border-emerald-500 text-emerald-950 font-semibold rounded-xl px-4 py-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white text-xs">✓</div>
                <span>Chromatin</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500 text-white px-2 py-0.5 rounded">Correct</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-slate-800 text-white px-2 py-0.5 rounded">Selected</span>
              </div>
            </div>

            {/* Option 3: Incorrect But Student Selected It anyway */}
            <div className="flex items-center justify-between bg-rose-50/50 border-2 border-rose-500 text-rose-950 font-semibold rounded-xl px-4 py-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-rose-500 flex items-center justify-center text-white text-xs">✕</div>
                <span>Cytosol</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-rose-500 text-white px-2 py-0.5 rounded">Incorrect Choice</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: TRUE / FALSE READ-ONLY CARD (Radio-based visual mapping)         */}
        {/* ========================================================================= */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-500 font-bold text-xs px-2.5 py-1 rounded-md">Question 03</span>
              <span className="bg-indigo-50 text-[#4a5fcd] font-bold text-xs px-2.5 py-1 rounded-md">True / False</span>
            </div>
            <div className="text-right text-emerald-600 font-bold text-sm flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              2 / 2 Points
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            The cell wall is a feature unique to plant cells and is not found in animal cells.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* True Option - Selected & Correct */}
            <div className="relative flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 text-[#4a5fcd] font-bold text-base pointer-events-none">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
              <span>True</span>
              <span className="absolute right-3 top-2.5 text-[9px] uppercase tracking-wider font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded">
                Correct / Chosen
              </span>
            </div>
            
            {/* False Option - Unselected */}
            <div className="relative flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-slate-100 text-slate-300 font-bold text-base opacity-50 pointer-events-none bg-slate-50/20">
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>False</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 4: SHORT ANSWER ACTION CARD (EDITABLE ASSESSMENT CARD)               */}
        {/* ========================================================================= */}
        <div className="bg-white border-2 border-amber-400/80 rounded-2xl p-6 sm:p-8 shadow-md space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-500 font-bold text-xs px-2.5 py-1 rounded-md">Question 04</span>
              <span className="bg-amber-50 text-amber-700 font-bold text-xs px-2.5 py-1 rounded-md">Short Answer</span>
            </div>
            <div className="text-right text-slate-400 font-bold text-xs uppercase tracking-wider">
              Max Value: <span className="text-slate-800 font-black text-sm">15 Points</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            Briefly explain the role of ATP in cellular processes and identify where it is primarily produced.
          </h3>

          {/* Student Submitted Data Container Layer */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Student's Submitted Answer:</span>
            <div className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-700 leading-relaxed shadow-inner">
              ATP acts as the primary energy currency. It gives power to internal cell processes like mechanical work and movement. It is made inside the powerplants called Mitochondria through chemical respiration cycles.
            </div>
          </div>

          {/* Teacher Guide Layer */}
          <div className="bg-indigo-50/40 border-l-4 border-[#4a5fcd] px-4 py-3 rounded-r-xl space-y-1">
            <span className="text-[11px] font-bold text-[#4a5fcd] uppercase tracking-wider block">Evaluation Grading Key Guide:</span>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Must mention: "energy currency", "metabolic reactions/processes", and explicitly name "mitochondria" as the source organelle.
            </p>
          </div>

          {/* Interactive Teacher Action Decision Toggles Deck */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-500 italic">
              Evaluate this submission response block to update point metrics:
            </span>
            
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              {/* Correct Evaluator Button option */}
              <button className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                Mark Correct
              </button>
              
              {/* Incorrect Evaluator Button option */}
              <button className="inline-flex items-center justify-center gap-2 border-2 border-rose-500 bg-white hover:bg-rose-50 text-rose-600 font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Mark Incorrect
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}