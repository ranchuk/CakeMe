import { IS_VALID, SET_USER_DATA } from '../types';

export default (state, action) => {
  switch (action.type) {
    case IS_VALID:
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
    case SET_USER_DATA:

      return { loading: false, user: action.payload.user.user, token: action.payload.user.token };
    default:
      return state;
  }
};