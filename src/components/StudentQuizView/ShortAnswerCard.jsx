import { useEffect, useState } from "react";
import useStudentQuizContext from "../../contexts/StudentQuizContext";

function ShortAnswerCard({id, index, nextComponent}){

    const {questions, chooseAnswerForShortAnswer} = useStudentQuizContext();

    let qt = questions.find((elem) => elem.id === id);

    return (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {/* Meta Attributes Layer */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div>
                <span className="bg-indigo-50 text-[#4a5fcd] font-bold text-xs px-3 py-1 rounded-md">
                  Question {index + 1} of {questions.length}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Topic: Cellular Biology &amp; Energy
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-[#4a5fcd]">{qt.points}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Points</span>
              </div>
            </div>

            {/* Core Prompts Text Header */}
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {qt.text}
              </h3>
              <div className="flex items-start gap-2 border-l-4 border-teal-500 bg-teal-50/40 px-3 py-2 rounded-r-xl mt-3 text-sm text-slate-600 font-medium">
                <span className="italic">Ensure your response covers energy source, conversion, and primary by-products.</span>
              </div>
            </div>

            {/* Input Response Textarea Area */}
            <div className="mb-6 relative">
              <textarea 
                value={qt.answer}
                placeholder="Type your explanation here..."
                className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5 text-slate-800 text-sm sm:text-base focus:outline-none focus:border-[#4a5fcd] focus:ring-1 focus:ring-[#4a5fcd] resize-none min-h-[180px]"
                maxLength={500}
                onChange={(e) => chooseAnswerForShortAnswer(qt.id, e.target.value)}
              />
            </div>

            {/* Bottom Actions Nav Toolbar inside Card */}
            <div className="flex flex-row sm:flex-row items-center justify-center border-t border-slate-100 pt-5 gap-4">
              
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button 
                onClick={() => {
                        if(index === 0) return;
                        nextComponent && nextComponent(index - 1);
                    }}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-bold transition-colors">
                  Previous
                </button>
                <button 
                onClick={() => {
                        if(index === (questions.length - 1)) return;
                        nextComponent && nextComponent(index + 1);
                    }}
                className="flex-1 sm:flex-initial bg-[#4a5fcd] hover:bg-[#3b4da6] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-sm transition-all">
                  Save &amp; Next
                </button>
              </div>
            </div>

          </div>
    );
}

export default ShortAnswerCard;