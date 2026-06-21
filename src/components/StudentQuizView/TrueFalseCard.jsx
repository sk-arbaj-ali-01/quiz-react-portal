import { useEffect, useState } from "react";
import useStudentQuizContext from "../../contexts/StudentQuizContext";

function TrueFalseCard({id, index, nextComponent}) {

    const [isTrueChecked, setIsTrueChecked] = useState(false);
    const [isFalseChecked, setIsFalseChecked] = useState(false);

    const {questions, chooseOptionForTrueFalse} = useStudentQuizContext();

    let qt = questions.find((elem) => elem.id === id);

    useEffect(() => {
        if(qt.selectedOption === true)
        {
            setIsTrueChecked(true);
        }
        else if(qt.selectedOption === false){
            setIsFalseChecked(true);
        }
    }, []);

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
            </div>

            {/* Interactive Radio Group Choice Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                {/* True Option */}
                <label className="relative flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold transition-all cursor-pointer bg-white hover:bg-slate-50/50 has-[:checked]:border-[#4a5fcd] has-[:checked]:bg-indigo-50/40 has-[:checked]:text-[#4a5fcd] group">
                    <input
                        type="radio"
                        name="true-false-input"
                        value={true}
                        className="sr-only"
                        onChange={() => {
                            chooseOptionForTrueFalse(qt.id, true);
                            setIsTrueChecked(true);
                            setIsFalseChecked(false);
                        }}
                        checked={isTrueChecked}
                    />
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-500 [[data-checked]&_path]:text-[#4a5fcd] dynamic-icon" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>True</span>
                </label>

                {/* False Option */}
                <label className="relative flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold transition-all cursor-pointer bg-white hover:bg-slate-50/50 has-[:checked]:border-rose-500 has-[:checked]:bg-rose-50/30 has-[:checked]:text-rose-600 group">
                    <input
                        type="radio"
                        name="true-false-input"
                        value={false}
                        className="sr-only"
                        onChange={() => {
                            chooseOptionForTrueFalse(qt.id, false);
                            setIsTrueChecked(false);
                            setIsFalseChecked(true);
                        }}
                        checked={isFalseChecked}
                    />
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-500 dynamic-icon" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>False</span>
                </label>

            </div>

            {/* Bottom Actions Nav Toolbar inside Card */}
            <div className="flex flex-col sm:flex-row items-center justify-center border-t border-slate-100 pt-5 gap-4">

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

export default TrueFalseCard;