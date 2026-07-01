import { useEffect, useRef, useState } from 'react';
import ShortAnswerCard from '../components/StudentQuizView/ShortAnswerCard';
import MCQCard from '../components/StudentQuizView/MCQCard';
import MSQCard from '../components/StudentQuizView/MSQCard';
import TrueFalseCard from '../components/StudentQuizView/TrueFalseCard';
import { StudentQuizProvider } from '../contexts/StudentQuizContext';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
import useHandleFetch from '../Utilities/useHandleFetch';
import UnAuthenticatedException from '../Exceptions/UnAuthenticatedException';
import UnAuthorizedException from '../Exceptions/UnAuthorizedException';
import { toast } from 'react-hot-toast';

export default function StudentQuizView() {
    const DEFAULT_TIMER_SECONDS = 20 * 60;

    const [indexForQuestion, setIndexForQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [groupId, setGroupId] = useState('');
    const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(DEFAULT_TIMER_SECONDS);
    const [authData, setAuthData] = useState();
    const hasAutoSubmittedRef = useRef(false);
    const progress = questions.filter((elem) => elem.answered === true).length;
    const handleFetch = useHandleFetch();
    const navigate = useNavigate();

    const { groupIdFromRoute } = useParams("groupIdFromRoute");

    const QUESTION_URL = import.meta.env.VITE_QUESTIONS_URL;
    const STUDENT_URL = import.meta.env.VITE_STUDENTS_URL;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const formatTimer = (totalSeconds) => {
        const safeSeconds = Math.max(0, totalSeconds ?? 0);
        const hours = Math.floor(safeSeconds / 3600);
        const minutes = Math.floor((safeSeconds % 3600) / 60);
        const seconds = safeSeconds % 60;

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const extractTimerInSeconds = (payload) => {
        if (!payload || typeof payload !== 'object') {
            return DEFAULT_TIMER_SECONDS;
        }

        if (typeof payload.examDuration === 'number') return Math.max(0, payload.examDuration * 60);

        const timerAmount = payload.timerAmount ?? payload.timer;

        if (typeof timerAmount === 'string' && timerAmount.includes(':')) {
            const parts = timerAmount.split(':').map((item) => Number.parseInt(item, 10));
            if (parts.some((part) => Number.isNaN(part))) {
                return 0;
            }

            if (parts.length === 3) {
                return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
            }

            if (parts.length === 2) {
                return (parts[0] * 60) + parts[1];
            }
        }

        if (typeof timerAmount === 'number') {
            return timerAmount <= 180 ? timerAmount * 60 : timerAmount;
        }

        return DEFAULT_TIMER_SECONDS;
    };

    const normalizeOptionList = (options = []) => {
        const mapped = (options ?? []).map((option, index) => {
            if (typeof option === 'string') {
                return { id: `${index + 1}`, option };
            }

            return {
                id: option?.optionId ?? `${index + 1}`,
                option: option?.optionText ?? ''
            };
        });

        while (mapped.length < 4) {
            mapped.push({ id: `placeholder-${mapped.length + 1}`, option: '' });
        }

        return mapped.slice(0, 4);
    };

    const normalizeStudentQuestions = (payload) => {
        if (Array.isArray(payload)) {
            return payload;
        }

        if (Array.isArray(payload?.records)) {
            return payload.records;
        }

        if (!payload || typeof payload !== 'object') {
            return [];
        }

        const normalizedMcq = (payload.mcq ?? []).map((question) => ({
            id: question.questionId,
            type: 'MCQ',
            text: question.text ?? '',
            points: question.points ?? 0,
            options: normalizeOptionList(question.options),
            selectedOption: null,
            answered: false,
        }));

        const normalizedMsq = (payload.msq ?? []).map((question) => ({
            id: question.questionId,
            type: 'MSQ',
            text: question.text ?? '',
            points: question.points ?? 0,
            options: normalizeOptionList(question.options),
            selectedOption: [],
            answered: false,
        }));

        const normalizedTf = (payload.tf ?? []).map((question) => ({
            id: question.questionId,
            type: 'TF',
            text: question.text ?? '',
            points: question.points ?? 0,
            selectedOption: null,
            answered: false,
        }));

        const normalizedSa = (payload.sa ?? []).map((question) => ({
            id: question.questionId,
            type: 'SA',
            text: question.text ?? '',
            points: question.points ?? 0,
            answer: '',
            answered: false,
        }));

        return [...normalizedMcq, ...normalizedMsq, ...normalizedTf, ...normalizedSa];
    };

    useEffect(() => {

        const endpoint = `${BASE_URL}/${QUESTION_URL}/${groupIdFromRoute}`;
        const authData = JSON.parse(localStorage.getItem("authData"));
        setAuthData(authData);

        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setGroupId(groupIdFromRoute || data?.groupId || '');
                setQuestions(normalizeStudentQuestions(data));
                setTimeLeftInSeconds(extractTimerInSeconds(data));
                // if (data && data.length > 0) {
                //     const t = data[0].type;
                //     if (t === 'MCQ') setComponent(<MCQCard id={data[0].id} index={0} nextComponent={changeComponent}/>)
                //     else if (t === 'MSQ') setComponent(<MSQCard id={data[0].id} index={0} nextComponent={changeComponent}/>)
                //     else if (t === 'TF') setComponent(<TrueFalseCard id={data[0].id} index={0} nextComponent={changeComponent}/>)
                //     else if (t === 'SA') setComponent(<ShortAnswerCard id={data[0].id} index={0} nextComponent={changeComponent}/>)
                // }
                console.log(data);
            })
            .catch(err => console.error('Failed to load questions', err));
        // console.log("inside useEffect");
    }, []);

    useEffect(() => {
        if (timeLeftInSeconds <= 0 || isSubmittingQuiz) {
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeftInSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeftInSeconds, isSubmittingQuiz]);

    const calculateProgress = () => questions.filter((elem) => elem.answered === true).length;

    const chooseOptionForMCQ = (id, option) => {
        setQuestions(prev => prev.map(elem => {
            if (elem.id === id) {
                return { ...elem, selectedOption: option, answered: true };
            }
            return elem;
        }));
    }

    const chooseOptionForMSQ = (id, option, selection) => {

        // console.log("Id = " + id + " option = " + option + " selection = " + selection);
        setQuestions(prev => prev.map(elem => {
            if (elem.id !== id) return elem;

            const selected = Array.isArray(elem.selectedOption) ? elem.selectedOption : [];

            // console.log("selected : ", selected);

            let newSelected = [];

            if (selected.length === 0) {
                if (selection === true) newSelected.push(option);
            }
            else {
                let isPresent = false;
                newSelected = selected.filter(elem => {
                    if (elem === option) {
                        isPresent = true;
                        if (selection === true) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return true;
                    }
                });

                if (!isPresent) {
                    newSelected.push(option);
                }
            }

            // console.log(newSelected);

            return { ...elem, selectedOption: newSelected, answered: true };
        }));
    }

    const chooseOptionForTrueFalse = (id, option) => {
        setQuestions(prev => prev.map(elem => elem.id === id ? { ...elem, selectedOption: option, answered: true } : elem));
    }

    const chooseAnswerForShortAnswer = (id, answer) => {
        setQuestions(prev => prev.map(elem => elem.id === id ? { ...elem, answer, answered: true } : elem));
    }

    const submitQuizAnswers = async () => {
        const preparedQuestions = {
            mcqAnswers: [],
            msqAnswers: [],
            trueFalseAnswers: [],
            shortAnswers: []
        };

        questions.forEach((question) => {
            if (question.type === 'MSQ') {
                const selectedOptions = Array.isArray(question.selectedOption) ? question.selectedOption : [];

                preparedQuestions.msqAnswers.push({
                    questionId: question.id,
                    questionType: question.type,
                    optionIds: selectedOptions,
                });
            }
            else if (question.type === 'MCQ') {
                preparedQuestions.mcqAnswers.push({
                    questionId: question.id,
                    questionType: question.type,
                    optionId: question.selectedOption,
                });
            }
            else if (question.type === 'TF') {
                preparedQuestions.trueFalseAnswers.push({
                    questionId: question.id,
                    questionType: question.type,
                    answer: question.selectedOption,
                });
            }
            else {
                preparedQuestions.shortAnswers.push({
                    questionId: question.id,
                    questionType: question.type,
                    answer: question.answer,
                });
            }
        });

        const payload = {
            groupId,
            ...preparedQuestions,
        };

        try {
            setIsSubmittingQuiz(true);

            handleFetch(async () => {
                const response = await fetch(`${BASE_URL}/${STUDENT_URL}/submit-answers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.accessToken}`,
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    toast.success(
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontWeight: 'bold', color: '#44ef77' }}>
                                Success {response.status || 200}: Submitted successfully
                            </span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>
                                {"Your exam has successfully submitted."}
                            </span>
                        </div>,
                        { duration: 3000 }
                    );
                    navigate('');
                }

                if (!response.ok) {
                    throw new Error('Failed to submit answers');
                }

                if (response.status === 401) {
                    throw new UnAuthenticatedException("You are not logged in to submit the answers.");
                }

                if (response.status === 403) {
                    throw new UnAuthorizedException("You don't have access to this resource.");
                }
            })

            hasAutoSubmittedRef.current = true;
        } catch (error) {
            console.error('Quiz submission failed:', error);
        } finally {
            setIsSubmittingQuiz(false);
        }
    }

    useEffect(() => {
        if (timeLeftInSeconds > 0 || isSubmittingQuiz || hasAutoSubmittedRef.current || questions.length === 0) {
            return;
        }

        hasAutoSubmittedRef.current = true;
        submitQuizAnswers();
    }, [timeLeftInSeconds, isSubmittingQuiz, questions]);

    return (
        <StudentQuizProvider value={{
            questions,
            progress,
            chooseOptionForMCQ,
            chooseOptionForMSQ,
            chooseOptionForTrueFalse,
            chooseAnswerForShortAnswer,
            calculateProgress
        }}>
            <div className="min-w-screen min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-12">

                {/* Top Countdown Bar */}
                <div className="bg-[#4a5fcd] text-white px-4 py-3.5 sm:px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-mono text-lg font-bold tracking-wider">{formatTimer(timeLeftInSeconds)}</span>
                    </div>
                    <h2 className="text-base font-bold tracking-wide hidden sm:block">Weekly Biology Quiz</h2>
                    <div className="flex items-center gap-4">
                        <button className="text-indigo-100 hover:text-white p-1 rounded transition-colors" title="Help / Instructions">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                        </button>
                        <button
                            onClick={submitQuizAnswers}
                            disabled={isSubmittingQuiz}
                            className="bg-white hover:bg-slate-50 text-[#4a5fcd] font-bold text-sm px-5 py-2 rounded-xl shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmittingQuiz ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    </div>
                </div>

                {/* Main Container Layout */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Side: Progress & Navigation Matrix Panel */}
                    <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm h-fit">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Progress</span>
                            <span className="text-sm font-bold text-[#4a5fcd]">{progress}/{questions.length}</span>
                        </div>

                        {/* Progress Micro-Bar */}
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                            <div className="bg-[#0f766e] h-full rounded-full" style={{ width: `${Math.floor((progress / (questions.length)) * 100)}%` }}></div>
                        </div>

                        {/* Grid of Numbered Links */}
                        <div className="grid grid-cols-5 gap-2.5 mb-6">
                            {questions.map((elem, index) => (
                                <button key={elem.id}
                                    onClick={() => setIndexForQuestion(index)}
                                    className="w-10 h-10 rounded-full bg-[#d9fcfa] text-black font-bold text-xs flex items-center justify-center transition-transform hover:scale-105">{index + 1}
                                </button>
                            ))}


                        </div>

                    </div>

                    {/* Right Side: Primary Active Question Interactive Panel & Context Tools */}
                    <div className="lg:col-span-9 space-y-6">

                        {questions.length > 0 && questions[indexForQuestion].type === 'MCQ' && (
                            <MCQCard
                                key={questions[indexForQuestion].id}
                                id={questions[indexForQuestion].id}
                                index={indexForQuestion}
                                nextComponent={setIndexForQuestion} />)}

                        {questions.length > 0 && questions[indexForQuestion].type === 'MSQ' && (
                            <MSQCard
                                key={questions[indexForQuestion].id}
                                id={questions[indexForQuestion].id}
                                index={indexForQuestion}
                                nextComponent={setIndexForQuestion} />)}

                        {questions.length > 0 && questions[indexForQuestion].type === 'TF' && (
                            <TrueFalseCard
                                key={questions[indexForQuestion].id}
                                id={questions[indexForQuestion].id}
                                index={indexForQuestion}
                                nextComponent={setIndexForQuestion} />)}

                        {questions.length > 0 && questions[indexForQuestion].type === 'SA' && (
                            <ShortAnswerCard
                                key={questions[indexForQuestion].id}
                                id={questions[indexForQuestion].id}
                                index={indexForQuestion}
                                nextComponent={setIndexForQuestion} />)}

                    </div>

                </div>
            </div>
        </StudentQuizProvider>
    );
}