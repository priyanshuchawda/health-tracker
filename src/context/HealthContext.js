import React, { createContext, useContext, useReducer } from 'react';

const HealthContext = createContext();

const initialState = {
  healthLogs: [],
  loading: false,
  error: null,
  notifications: [],
  unreadNotifications: 0
};

function healthReducer(state, action) {
  switch (action.type) {
    case 'SET_HEALTH_LOGS':
      return {
        ...state,
        healthLogs: action.payload,
        loading: false
      };
    case 'ADD_HEALTH_LOG':
      return {
        ...state,
        healthLogs: [action.payload, ...state.healthLogs]
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadNotifications: action.payload.filter(n => !n.read).length
      };
    default:
      return state;
  }
}

export function HealthProvider({ children }) {
  const [state, dispatch] = useReducer(healthReducer, initialState);

  return (
    <HealthContext.Provider value={{ state, dispatch }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
