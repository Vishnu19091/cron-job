"use client";

import { createContext, useContext, useReducer } from "react";

/*
Context Provider for Job create page
*/

const JobCreateContext = createContext();

const initialState = {
  jobName: "",
  jobURL: "",
  jobMethod: "GET",
  jobBody: "",
  scheduleType: "EVERY_MINUTES",
  intervalMinutes: 1,
  dailyHour: "00",
  dailyMinute: "00",
  monthlyDay: 1,
  yearlyMonth: 1,
  cronExpression: "*/1 * * * *",
  humanText: "Runs every 1 minute",
};

function reducer(state, action) {
  switch (action.type) {
    // For Job Fields
    case "SET_JOB_NAME":
      return { ...state, jobName: action.payload };

    case "SET_JOB_URL":
      return { ...state, jobURL: action.payload };

    case "SET_JOB_METHOD":
      return { ...state, jobMethod: action.payload };

    case "SET_JOB_BODY":
      return { ...state, jobBody: action.payload };

    case "SET_SCHEDULE_TYPE":
      return { ...state, scheduleType: action.payload };

    case "SET_INTERVAL_MINUTES":
      return { ...state, intervalMinutes: action.payload };

    case "SET_DAILY_TIME":
      return {
        ...state,
        dailyHour: action.payload.hour,
        dailyMinute: action.payload.minute,
      };

    case "SET_MONTHLY_DAY":
      return {
        ...state,
        monthlyDay: action.payload.day,
        dailyHour: action.payload.hour,
        dailyMinute: action.payload.minute,
      };

    case "SET_YEARLY_MONTH":
      return {
        ...state,
        yearlyMonth: action.payload.month,
        dailyHour: action.payload.hour,
        dailyMinute: action.payload.minute,
      };

    case "SET_CRON":
      return {
        ...state,
        cronExpression: action.payload.cron,
        humanText: action.payload.text,
      };

    // case "SET_TEXT":
    //   return {...state, humanText:action.payload}

    default:
      throw new Error("Unknow action type!");
  }
}

function CreateJobProvider({ children }) {
  const [
    {
      jobName,
      jobURL,
      jobMethod,
      jobBody,
      scheduleType,
      intervalMinutes,
      dailyHour,
      dailyMinute,
      monthlyDay,
      yearlyMonth,
      cronExpression,
      humanText,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <JobCreateContext.Provider
      value={{
        jobName,
        jobURL,
        jobMethod,
        jobBody,
        scheduleType,
        intervalMinutes,
        dailyHour,
        dailyMinute,
        monthlyDay,
        yearlyMonth,
        cronExpression,
        humanText,
        dispatch,
      }}
    >
      {children}
    </JobCreateContext.Provider>
  );
}

function useCreateJob() {
  const context = useContext(JobCreateContext);
  if (context === undefined) {
    throw new Error("Context used outside the prop");
  }
  return context;
}

export { CreateJobProvider, useCreateJob };
