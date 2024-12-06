import { useReducer } from 'react';

type ActionType =
  | { type: 'TOGGLE_POP' }
  | { type: 'LOGOUT' }
  | { type: 'EXIT' }
  | { type: 'CLOSE' };

type StateType = {
  isPop: boolean;
  showLogoutDialog: boolean;
  showExitDialog: boolean;
};

const initialState: StateType = {
  isPop: false,
  showLogoutDialog: false,
  showExitDialog: false,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'TOGGLE_POP':
      return { ...state, isPop: !state.isPop };
    case 'LOGOUT':
      return { ...state, isPop: false, showLogoutDialog: true };
    case 'EXIT':
      return { ...state, isPop: false, showExitDialog: true };
    case 'CLOSE':
      return { ...state, isPop: false, showLogoutDialog: false, showExitDialog: false };
    default:
      return state;
  }
};

export const useTopBarState = () => {
  return useReducer(reducer, initialState);
};
