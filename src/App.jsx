import Home from "./pages/Home"
import QuizEditor from "./pages/QuizEditor"
import QuizManagement from "./pages/QuizManagement"
import StudentQuizView from "./pages/StudentQuizView"
import StudentSubmissions from "./pages/StudentSubmissions"
import StudentSubmissionReview from "./pages/StudentSubmissionReview"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import RelateTeacherToStudents from "./pages/RelateTeacherToStudents";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import StudentQuizHistory from "./pages/StudentQuizHistory"

function MainDashboardDirector() {
  try {
    const storedAuth = localStorage.getItem('authData');
    
    if (storedAuth) {
      const parsedData = JSON.parse(storedAuth);
      
      // Dynamic routing switches matching backend role structures explicitly
      if (parsedData?.role === 'TEACHER') {
        return <TeacherDashboard />;
      }
      if (parsedData?.role === 'STUDENT') {
        return <StudentDashboard />;
      }
    }
  } catch (error) {
    console.error("Error directing auth entry states:", error);
  }

  // Fallback default landing view if unauthenticated or error occurs
  return <Home />;
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainDashboardDirector />
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "quiz-management",
        element: <QuizManagement />
      },
      {
        path: "question-management",
        element: <QuizEditor />
      },
      {
        path: "start-quiz/:groupIdFromRoute",
        element: <StudentQuizView />
      },
      {
        path: "find-teachers",
        element: <RelateTeacherToStudents />
      },
      {
        path: "student-submissions",
        element: <StudentSubmissions />
      },
      {
        path: "student-submission-review/group/:groupId/student/:studentId",
        element: <StudentSubmissionReview />
      },
      {
        path: "my-quizzes",
        element: <StudentQuizHistory />
      }
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
