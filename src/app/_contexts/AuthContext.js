"use client";
/*
Context Provider for User Session

provides
User name
User email
User Avatar
side bar

and also global theme state (Dark/White mode)
*/

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  getActiveJobs,
  getUserJobs,
} from "@/app/_lib/server/server-data-service";

const AuthContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  userId: null,
  userName: null,
  userEmail: null,
  userAvatar: null,
  userVerified: null,
  mode: "dark",
  isSideBarOpen:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("sidebar-open")) ?? true
      : true,
  totalJobs: null,
  totalActiveJobs: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "session/loaded":
      return {
        ...state,
        isLoading: false,
        userId: action.payload.$id,
        userName: action.payload.name,
        userEmail: action.payload.email,
        userAvatar: action.payload.avatar,
        userVerified: action.payload.emailVerification,
      };

    case "session/rejected":
      return {
        ...state,
        isLoading: false,
        userId: null,
        userName: null,
        userEmail: null,
        userAvatar: null,
        userVerified: null,
        error: action.payload,
      };

    case "Toggle_Side_Bar":
      return { ...state, isSideBarOpen: action.payload };

    case "SET_TOTAL_JOBS/ALL":
      return {
        ...state,
        totalJobs: action.payload.totaljobs,
        totalActiveJobs: action.payload.activeJobs,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [
    {
      userId,
      userName,
      userEmail,
      userAvatar,
      userVerified,
      isLoading,
      mode,
      isSideBarOpen,
      totalJobs,
      totalActiveJobs,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadSession = async () => {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Unauthorized!");

        const data = await res.json();
        // console.log(data);

        const fetchJobsTotal = await getUserJobs();
        // console.log(fetchJobsTotal.total);

        const fetchActiveJobs = await getActiveJobs();

        dispatch({
          type: "SET_TOTAL_JOBS/ALL",
          payload: {
            totaljobs: fetchJobsTotal.total,
            activeJobs: fetchActiveJobs.total,
          },
        });

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

  // To store the sidebar state
  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(isSideBarOpen));
  }, [isSideBarOpen]);

  const [hydrated, setHydrated] = useState(false);

  /*
  This prevents the jumping UI of the sidebar
  that is we are determining the hydration here
  once SSR is completed we try rendering the component on the client-side
  */
  useEffect(() => {
    setHydrated(true);
  }, []);

  // allows rendering components only after hydration is completed
  if (!hydrated) return null;

  return (
    <AuthContext.Provider
      value={{
        userId,
        userName,
        userEmail,
        userAvatar,
        userVerified,
        isLoading,
        mode,
        isSideBarOpen,
        totalJobs,
        totalActiveJobs,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context Used outside the provider");
  return context;
}

export { AuthProvider, useAuth };
