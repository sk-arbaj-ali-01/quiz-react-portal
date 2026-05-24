import React, { useEffect, useState } from 'react';
import MCQ from '../components/QuizEditor/MCQ';
import MSQ from '../components/QuizEditor/MSQ';
import TrueFalse from '../components/QuizEditor/TrueFalse';
import ShortAnswer from '../components/QuizEditor/ShortAnswer';

export default function QuizEditor() {
    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        console.log(questions);
    }, [questions]);

    // Handler to delete a question
    const deleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addNewQuestion = (question) => {
        setQuestions(questions.map((elem) => {
            if (elem.id === question.id) {
                elem.text = question.text;
                elem.points = question.points;
                elem.options && (elem.options = question.options);
                elem.correctAnswer = question.correctAnswer;
                return elem;
            }
            return elem;
        }))
    };

    // Handler to add new specific templates
    const addQuestionCard = (type) => {
        const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
        let baseCard = {
            id: newId,
            points: 0,
            text: '',
        };

        if (type === 'MCQ') {
            baseCard = { ...baseCard, type: 'MCQ', options: ['', '', '', ''], correctAnswer: 0 };
        } else if (type === 'MSQ') {
            baseCard = { ...baseCard, type: 'MSQ', options: ['', '', '', ''], correctAnswer: [] };
        } else if (type === 'TF') {
            baseCard = { ...baseCard, type: 'TF', correctAnswer: true };
        } else if (type === 'SA') {
            baseCard = { ...baseCard, type: 'SA' };
        }

        setQuestions([...questions, baseCard]);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#f8fafc] text-[#1e293b] font-sans antialiased min-h-screen relative">

            {/* Header Info Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#2e42a5] tracking-tight">Editor: Cell Structures & Functions</h1>
                    <p className="text-slate-500 mt-1 text-sm sm:text-base">
                        Drafting questions for the upcoming mid-term assessment. Questions will be automatically randomized during the student session.
                    </p>
                </div>
            </div>

            {/* Dynamic Question List Space */}
            <div className="space-y-8 mb-12">
                {questions.map((question, index) => {
                    const formattedIndex = String(index + 1).padStart(2, '0');

                    if(question.type === 'MCQ') 
                        return <MCQ 
                                key={question.id}
                                id={question.id} 
                                formattedIndex={formattedIndex}
                                deleteQuestion={deleteQuestion}
                                addNewQuestion={addNewQuestion}
                                />
                    else if(question.type === 'MSQ')
                        return <MSQ 
                                key={question.id}
                                id={question.id} 
                                formattedIndex={formattedIndex}
                                deleteQuestion={deleteQuestion}
                                addNewQuestion={addNewQuestion}
                                />
                    else if(question.type === 'TF')
                        return <TrueFalse
                                key={question.id} 
                                id={question.id} 
                                formattedIndex={formattedIndex}
                                deleteQuestion={deleteQuestion}
                                addNewQuestion={addNewQuestion}
                                />
                    else
                        return <ShortAnswer 
                                key={question.id}
                                id={question.id} 
                                formattedIndex={formattedIndex}
                                deleteQuestion={deleteQuestion}
                                addNewQuestion={addNewQuestion}
                                />
                })}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-lg max-w-3xl mx-auto border-t-4 border-[#2e42a5]" >
                    <p className="text-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
                        Add New Question Template
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button
                            onClick={() => addQuestionCard('MCQ')}
                            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-[#2e42a5] bg-slate-50/50 hover:bg-indigo-50/40 text-slate-700 hover:text-[#2e42a5] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            + MCQ
                        </button>

                        <button
                            onClick={() => addQuestionCard('MSQ')}
                            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-[#2e42a5] bg-slate-50/50 hover:bg-indigo-50/40 text-slate-700 hover:text-[#2e42a5] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            + MSQ
                        </button>

                        <button
                            onClick={() => addQuestionCard('TF')}
                            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-[#2e42a5] bg-slate-50/50 hover:bg-indigo-50/40 text-slate-700 hover:text-[#2e42a5] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            + True/False
                        </button>

                        <button
                            onClick={() => addQuestionCard('SA')}
                            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-[#2e42a5] bg-slate-50/50 hover:bg-indigo-50/40 text-slate-700 hover:text-[#2e42a5] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                            + Short Text
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}