"use client";
/*
Context Provider for User Session

provides
User name
User email
User provider (Session)
User Avatar

and also global theme state (Dark/White mode)
*/

import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  userName: null,
  userEmail: null,
  userProvider: null,
  userAvatar: null,
  mode: "dark",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "session/loaded":
      return {
        ...state,
        isLoading: false,
        userName: action.payload.name,
        userEmail: action.payload.email,
        userAvatar: action.payload.avatar,
        userProvider: action.payload.provider,
      };

    case "session/rejected":
      return {
        ...state,
        isLoading: false,
        userName: null,
        userEmail: null,
        userProvider: null,
        userAvatar: null,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [
    { userName, userEmail, userAvatar, userProvider, isLoading, dark },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadSession = async () => {
      dispatch({ type: "loading" });

      try {
        const res = await fetch("/api/user");
        const data = await res.json().then((data) => data.user);

        dispatch({ type: "session/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "session/rejected",
          payload: "Error Fetching session",
        });
      }
    };

    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userName,
        userEmail,
        userProvider,
        userAvatar,
        isLoading,
        dark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context User outside the provider");
  return context;
}

export { AuthProvider, useAuth };
