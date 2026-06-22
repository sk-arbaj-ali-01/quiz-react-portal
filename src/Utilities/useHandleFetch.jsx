import RecordNotFoundException from "../Exceptions/RecordNotFoundException.js";
import UnAuthenticatedException from "../Exceptions/UnAuthenticatedException.js";
import UnAuthorizedException from "../Exceptions/UnAuthorizedException.js"; // Fixed import path
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// 1. Change the name to start with 'use' so React allows hooks inside it
function useHandleFetch() {
    const navigate = useNavigate();

    // 2. Return the actual async worker function
    const handleFetch = async (callback, callbackFinally) => {
        try {
            await callback();
        }
        catch (ex) {
            if (ex instanceof UnAuthorizedException) {
                toast.error(
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                      Error {ex.code || 403}: Unauthorized
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {ex.message || "You are not allowed to access this resource."}
                    </span>
                  </div>, 
                  { duration: 3000 }
                );
            }
            else if (ex instanceof UnAuthenticatedException) {
                toast.error(
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                      Error {ex.code || 401}: Unauthenticated
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {ex.message || "Your session has expired. Please login again."}
                    </span>
                  </div>, 
                  { duration: 3000 }
                );
                
                localStorage.removeItem("authData");
                window.dispatchEvent(new Event('storage'));
                navigate("/login"); // Works perfectly now!
            }
            else if (ex instanceof RecordNotFoundException) {
                toast.error(
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                      Error {ex.code || 404}: Record not found
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {ex.message || "Record Not Found"}
                    </span>
                  </div>, 
                  { duration: 3000 }
                );
                
                localStorage.removeItem("authData");
                window.dispatchEvent(new Event('storage'));
                navigate("/login"); // Works perfectly now!
            }
            else {
                toast.error(
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                      Error {ex.code || 500}: Server Error
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {ex.message || "Some error has occurred. Please report to the dev team."}
                    </span>
                  </div>, 
                  { duration: 3000 }
                );
            }
        }
        finally {
            if (callbackFinally instanceof Function) {
                callbackFinally();
            }
        }
    };

    return handleFetch;
}

export default useHandleFetch;