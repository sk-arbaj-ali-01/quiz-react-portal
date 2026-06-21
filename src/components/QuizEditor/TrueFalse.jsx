import { useEffect, useState } from "react";

function TrueFalse({id, questionData, formattedIndex, deleteQuestion, addNewQuestion}) {

    const sanitizePoints = (value) => {
        const parsed = Number.parseInt(value, 10);
        if (Number.isNaN(parsed)) {
            return 0;
        }

        return Math.max(0, parsed);
    };

    const [question, setQuestion] = useState({
       id:id,
       type: 'TF',
       points: Math.max(0, questionData?.points ?? 0),
       text: questionData?.text ?? '',
       correctAnswer: questionData?.correctAnswer ?? true
    });

    useEffect(()=>{
        addNewQuestion(question);
    }, [question]);

    // Handler to change points
    const handlePointsChange = (newPoints) => {
        setQuestion((prev) => ({...prev, points:sanitizePoints(newPoints)}));
    };

    return (
    <div key={id} className="bg-white rounded-2xl border-l-4 border-[#2e42a5] shadow-sm border border-slate-100 overflow-hidden p-6 relative group">

        {/* Question Header Metadata */}
        <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
                <span className="bg-[#eef2ff] text-[#2e42a5] font-bold text-xs px-2.5 py-1 rounded-md">
                    Question {formattedIndex}
                </span>
                <span className="bg-slate-100 text-slate-600 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md">
                    True/False
                </span>
            </div>

            {/* Score Controls & Trash Wrapper */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Points</label>
                    <input
                        type="number"
                        min="0"
                        value={question.points}
                        onChange={(e) => handlePointsChange(e.target.value)}
                        className="w-14 bg-[#f1f5f9] text-slate-800 font-bold text-center py-1.5 px-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2e42a5] text-sm"
                    />
                </div>
                <button
                    onClick={() => deleteQuestion(id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove Question"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
            </div>
        </div>

        {/* Main Question Text Container Area */}
        <div className="mb-5">
            <textarea
                value={question.text}
                placeholder="Enter your question details here..."
                className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl p-4 text-slate-800 text-sm focus:outline-none focus:border-[#2e42a5] focus:ring-1 focus:ring-[#2e42a5] resize-y min-h-[70px]"
                onChange={(e) => {
                    const txt = e.target.value;
                    setQuestion((prev) => ({...prev, text:txt}));
                }}
            />
        </div>

        {/* RENDER COMPONENT LOGIC BY CONTEXT TYPE */}

        {/* Scenario 1: MCQ Options Stack */}
        
            <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Options &amp; Answer Key</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button 
                    onClick={() => setQuestion((prev) => ({...prev, correctAnswer: true}))}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-bold transition-all ${
                      question.correctAnswer === true 
                        ? 'bg-[#2e42a5] text-white border-transparent shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    True
                  </button>
                  <button 
                    onClick={() => setQuestion((prev) => ({...prev, correctAnswer:false}))}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-sm font-bold transition-all ${
                      question.correctAnswer === false 
                        ? 'bg-[#2e42a5] text-white border-transparent shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    False
                  </button>
                </div>
            </div>

    </div>
    );
}

export default TrueFalse;