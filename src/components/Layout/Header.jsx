import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = () => {
    try {
      const storedAuth = localStorage.getItem('authData');
      if (storedAuth) {
        const parsedData = JSON.parse(storedAuth);
        if (parsedData && parsedData.role) {
          setRole(parsedData.role.toUpperCase());
          setIsLoggedIn(true);
          return;
        }
      }
      // Reset if no auth data found
      setIsLoggedIn(false);
      setRole(null);
    } catch (error) {
      console.error("Failed to parse authData from localStorage:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // Check once immediately when component mounts
    checkAuth();

    // Listen for storage updates
    window.addEventListener('storage', checkAuth);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authData');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <nav className="bg-[#4a5fcd] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm sticky top-0 z-50">
      
      {/* Brand Cluster & Conditional Layout Links */}
      <div className="flex items-center gap-8">
        <Link to="#dashboard" className="text-xl font-bold tracking-tight hover:opacity-90 transition-opacity">
          QuizMaster
        </Link>
        
        {/* Only render navigation tabs if user is authenticated */}
        {isLoggedIn && (
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            {role === 'TEACHER' ? (
              /* ==========================================
                 TEACHER (PROFESSOR) EXCLUSIVE LINKS
                 ========================================== */
              <>
                <Link to="" className="text-indigo-100 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="quiz-management" className="text-indigo-100 hover:text-white transition-colors">
                  Manage Quizzes
                </Link>
                <Link to="question-management" className="text-indigo-100 hover:text-white transition-colors">
                  Manage Questions
                </Link>
                <Link to="#reports" className="text-indigo-100 hover:text-white transition-colors">
                  Class Insights
                </Link>
              </>
            ) : (
              /* ==========================================
                 STUDENT / STANDARD DEFAULT LINKS
                 ========================================== */
              <>
                <Link to="#dashboard" className="text-white border-b-2 border-white pb-1">
                  My Dashboard
                </Link>
                <Link to="#active-quizzes" className="text-indigo-100 hover:text-white transition-colors">
                  Available Tests
                </Link>
                <Link to="#my-results" className="text-indigo-100 hover:text-white transition-colors">
                  Past Grades
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Dynamic Profile Meta / Controls Right Wing */}
      <div className="flex items-center gap-4">
        
        {isLoggedIn ? (
          /* ==========================================
             AUTHENTICATED STATE CONTROLS
             ========================================== */
          <>
            <button className="p-1.5 text-indigo-100 hover:text-white rounded-lg transition-colors hidden sm:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <span className="hidden sm:inline-block bg-white/10 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-indigo-50">
              {role}
            </span>

            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-200 bg-indigo-100 flex-shrink-0">
                <img 
                  src={
                    role === 'TEACHER'
                      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                      : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
                  } 
                  alt="User Workspace Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <button 
                onClick={handleLogout}
                className="text-xs font-bold bg-white/10 hover:bg-rose-600 hover:text-white px-3 py-1.5 rounded-lg text-indigo-100 transition-all border border-transparent hover:border-rose-500"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          /* ==========================================
             UNAUTHENTICATED (GUEST) STATE LINKS
             ========================================== */
          <div className="flex items-center gap-3">
            <NavLink
              to="login" 
              className={({isActive}) => (
                `text-sm ${isActive ? "font-bold bg-white text-[#4a5fcd] hover:bg-indigo-50" : ""} px-4 py-2 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0`
              )}
            >
              Login
            </NavLink>
            <NavLink 
              to="register" 
              className={({isActive}) => (
                `text-sm ${isActive ? "font-bold bg-white text-[#4a5fcd] hover:bg-indigo-50" : ""} px-4 py-2 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0`
              )}
            >
              Register
            </NavLink>
          </div>
        )}

      </div>
    </nav>
  );
}