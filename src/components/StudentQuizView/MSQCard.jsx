import { useEffect, useState } from "react";
import useStudentQuizContext from "../../contexts/StudentQuizContext";

function MSQCard({id, index, nextComponent}) {

    const {questions, chooseOptionForMSQ} = useStudentQuizContext();
    const [isChecked, setIsChecked] = useState([false,false,false,false]);

    let qt = questions.find((elem) => elem.id === id);

    const handleOptionCheck = (index) =>{
        setIsChecked((prev) => {
            let newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    }

    useEffect(() => {

        for(let item in questions[index].selectedOption){
            setIsChecked((prev) => {
            let newState = [...prev];
            newState[item] = true;
            return newState;
        });
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
                <div className="flex items-start gap-2 border-l-4 border-teal-500 bg-teal-50/40 px-3 py-2 rounded-r-xl mt-3 text-sm text-slate-600 font-medium">
                    <span className="italic">Multiple options may be correct. Select all that apply.</span>
                </div>
            </div>

            {/* Interactive Checkbox Options Stack */}
            <div className="space-y-3 mb-6">
                <label className="flex items-center gap-4 bg-[#f8fafc] border border-slate-200/80 rounded-2xl px-5 py-4 cursor-pointer hover:border-[#4a5fcd]/60 hover:bg-slate-50 transition-all group">
                    <input
                        value={qt.options[0].id}
                        checked={isChecked[0]}
                        onChange={() => {
                            chooseOptionForMSQ(qt.id, qt.options[0].id);
                            handleOptionCheck(0);
                        }}
                        type="checkbox"
                        className="w-5 h-5 text-[#4a5fcd] focus:ring-[#4a5fcd] border-slate-300 rounded"
                    />
                    <span className="text-sm sm:text-base font-medium text-slate-700 group-hover:text-slate-900">{qt.options[0].option}</span>
                </label>

                <label className="flex items-center gap-4 bg-[#f8fafc] border border-slate-200/80 rounded-2xl px-5 py-4 cursor-pointer hover:border-[#4a5fcd]/60 hover:bg-slate-50 transition-all group">
                    <input
                        value={qt.options[1].id}
                        checked={isChecked[1]}
                        onChange={() => {
                            chooseOptionForMSQ(qt.id, qt.options[1].id);
                            handleOptionCheck(1);
                        }}
                        type="checkbox"
                        className="w-5 h-5 text-[#4a5fcd] focus:ring-[#4a5fcd] border-slate-300 rounded"
                    />
                    <span className="text-sm sm:text-base font-medium text-slate-700 group-hover:text-slate-900">{qt.options[1].option}</span>
                </label>

                <label className="flex items-center gap-4 bg-[#f8fafc] border border-slate-200/80 rounded-2xl px-5 py-4 cursor-pointer hover:border-[#4a5fcd]/60 hover:bg-slate-50 transition-all group">
                    <input
                        value={qt.options[2].id}
                        checked={isChecked[2]}
                        onChange={() => {
                            chooseOptionForMSQ(qt.id, qt.options[2].id);
                            handleOptionCheck(2);
                        }}
                        type="checkbox"
                        className="w-5 h-5 text-[#4a5fcd] focus:ring-[#4a5fcd] border-slate-300 rounded"
                    />
                    <span className="text-sm sm:text-base font-medium text-slate-700 group-hover:text-slate-900">{qt.options[2].option}</span>
                </label>

                <label className="flex items-center gap-4 bg-[#f8fafc] border border-slate-200/80 rounded-2xl px-5 py-4 cursor-pointer hover:border-[#4a5fcd]/60 hover:bg-slate-50 transition-all group">
                    <input
                        value={qt.options[3].id}
                        checked={isChecked[3]}
                        onChange={() => {
                            chooseOptionForMSQ(qt.id, qt.options[3].id);
                            handleOptionCheck(3);
                        }}
                        type="checkbox"
                        className="w-5 h-5 text-[#4a5fcd] focus:ring-[#4a5fcd] border-slate-300 rounded"
                    />
                    <span className="text-sm sm:text-base font-medium text-slate-700 group-hover:text-slate-900">{qt.options[3].option}</span>
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

export default MSQCard;