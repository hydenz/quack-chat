import { createStore } from 'redux';
import jwtDecode from 'jwt-decode';

const initialState: State = {
  currentUser: {
    id: localStorage.getItem('accessToken')
      ? (jwtDecode(localStorage.getItem('accessToken')!) as any).id
      : '',
    accessToken: localStorage.getItem('accessToken') || '',
  },
  selectedContactId: '',
};

export enum ACTION_TYPES {
  LOGGED_IN = 'LOGGED_IN',
  SELECT_CONTACT = 'SELECT_CONTACT',
  DESELECT_CONTACT = 'DESELECT_CONTACT',
}

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ACTION_TYPES.LOGGED_IN:
      return {
        ...state,
        currentUser: {
          accessToken: action.payload.accessToken,
          id: action.payload.id,
        },
      };
    case ACTION_TYPES.SELECT_CONTACT:
      return { ...state, selectedContactId: action.payload.id };
    case ACTION_TYPES.DESELECT_CONTACT:
      return { ...state, selectedContactId: '' };
    default:
      return state;
  }
}

const store = createStore(reducer);
store.subscribe(() => {
  localStorage.setItem('accessToken', store.getState().currentUser.accessToken);
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

interface Action {
  type: ACTION_TYPES;
  payload?: any;
}

interface State {
  currentUser: { id: string; accessToken: string };
  selectedContactId: string;
}
