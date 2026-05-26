import { createContext, useContext } from "react";

const StudentQuizContext = createContext({
    questions:[],
    totalProgress: 0,
    chooseOptionForMCQ: () => {},
    chooseOptionForMSQ: () => {},
    chooseOptionForTrueFalse: () => {},
    chooseAnswerForShortAnswer: () => {},
    calculateProgress: () => {}
});

const StudentQuizProvider = StudentQuizContext.Provider;
export {StudentQuizContext, StudentQuizProvider};

const useStudentQuizContext = () =>{
    const context = useContext(StudentQuizContext);
    return context;
}

export default useStudentQuizContext;