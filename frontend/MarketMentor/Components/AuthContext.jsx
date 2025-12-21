import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (values) => {
    try {
      setError(false);
      setLoading(true);

      const response = await fetch(`http://localhost:3000/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setError("Could not sign you up");
        return error;
      }
      const data = await response.json(); //username, their progress, and their access token

      setToken(data.accessToken);
      sessionStorage.setItem("access", data.accessToken);
     
      
      setLoading(false);
      navigate("/Dashboard");
    } catch (err) {
      setError(err);
    }
  };

  const login = async (values) => {
    try {
      setError(false);
      setLoading(true);

      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setError("Could not sign you up");
        return error;
      }
      const data = await response.json(); //username, their progress, and their access token

      setToken(data.accessToken);

      sessionStorage.setItem("access", data.accessToken);
      setLoading(false);
      navigate("/Dashboard");
    } catch (err) {
      setError(err);
    }
  };
    
    const logout = () => {
        setToken(null)
        sessionStorage.removeItem("access")
    }

    const delete_account = async () => {
        try {
            const response = await fetch(`http://localhost:3000/delete-account`, {
                method: 'DELETE',
                headers: {"Authorization" : "Bearer " + sessionStorage.getItem("access")}
            });

            if (!response.ok) {
                setError(response.error)
            }

            navigate("/Landing-Page")
        } catch {
            
        }
    }
  return (
    <AuthContext.Provider
      value={{ token, login, logout, signup, error, loading, delete_account }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
