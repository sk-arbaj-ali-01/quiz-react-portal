import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useHandleFetch from '../Utilities/useHandleFetch';
import UnAuthenticatedException from '../Exceptions/UnAuthenticatedException';
import UnAuthorizedException from '../Exceptions/UnAuthorizedException';

export default function StudentSubmissionReview() {

  const { groupId, studentId } = useParams();
  const [authData, setAuthData] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [submission, setSubmission] = useState([]);
  const handleFetch = useHandleFetch();
  const navigate = useNavigate();

  const TEACHER_URL = import.meta.env.VITE_TEACHER_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmission = (questionId, isCorrect) =>{
    let isPresent = false;
    setSubmission(submission.map((item) => {
      if(item.questionId === questionId){
        isPresent = true;
        return {questionId, isCorrect};
      }
      else return item;
    }));

    if(!isPresent){
      setSubmission([...submission, {questionId, isCorrect}]);
    }
  };

  const submitReview = () =>{
    handleFetch(async ()=>{
      const response = await fetch(`${BASE_URL}/${TEACHER_URL}/submit-review`, {
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${authData.accessToken}`
        },
        body: JSON.stringify({
          groupId,
          studentId,
          submission
        })
      });

      if(response.ok) navigate("/student-submissions");
      else throw new Error("Review submission failed.");

      if(response.status === 401) throw new UnAuthenticatedException("Please login to submit review");
    });
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("authData");
    const parsedData = JSON.parse(storedAuth);
    setAuthData(parsedData);

    handleFetch(async () => {
      const response = fetch(`${BASE_URL}/${TEACHER_URL}/group/${groupId}/student/${studentId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedData.accessToken}`
        }
      });

      if (response.status === 401) throw new UnAuthenticatedException("Please login to give review");

      if (response.status === 403) throw new UnAuthorizedException("You don't have access to this resource");

      const data = await response.json();

      if (!response.ok) throw new Error("Some error has occurred: ", data.message);

      setReviewData(data);
      
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-16">

      {/* Main Workspace Frame */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">

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
          <button 
          onClick={submitReview}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition-all self-start sm:self-center transform hover:-translate-y-0.5 active:translate-y-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Submit Review
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CARD 4: SHORT ANSWER ACTION CARD (EDITABLE ASSESSMENT CARD)               */}
        {/* ========================================================================= */}
        {reviewData.map((item, index) => (
          <div key={item.questionId} className="bg-white border-2 border-amber-400/80 rounded-2xl p-6 sm:p-8 shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-500 font-bold text-xs px-2.5 py-1 rounded-md">Question {index}</span>
                <span className="bg-amber-50 text-amber-700 font-bold text-xs px-2.5 py-1 rounded-md">Short Answer</span>
              </div>
              <div className="text-right text-slate-400 font-bold text-xs uppercase tracking-wider">
                Max Value: <span className="text-slate-800 font-black text-sm">{item.points}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {item.questionText}
            </h3>

            {/* Student Submitted Data Container Layer */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Student's Submitted Answer:</span>
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-700 leading-relaxed shadow-inner">
                {item.answerText}
              </div>
            </div>

            {/* Interactive Teacher Action Decision Toggles Deck */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-500 italic">
                Evaluate this submission response block to update point metrics:
              </span>

              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                {/* Correct Evaluator Button option */}
                <button 
                onClick={() => handleSubmission(item.questionId, true)}
                className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Mark Correct
                </button>

                {/* Incorrect Evaluator Button option */}
                <button 
                onClick={() => handleSubmission(item.questionId, false)}
                className="inline-flex items-center justify-center gap-2 border-2 border-rose-500 bg-white hover:bg-rose-50 text-rose-600 font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95">
                  <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Mark Incorrect
                </button>
              </div>
            </div>

          </div>
        ))}

      </main>
    </div>
  );
}