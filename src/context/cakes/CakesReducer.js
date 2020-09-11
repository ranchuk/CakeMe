import { GET_CAKES, CAKES_ERROR } from '../types';

export default (state, action) => {

  switch (action.type) {
    case GET_CAKES:
      return { ...state, loading: false, cakes: action.payload };
    case CAKES_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};