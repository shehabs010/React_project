import * as actionTypes from './actions';

const initialState = {
  inputSearch: window.localStorage.getItem('inputValue'),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOTO_DETAILS_TITLE:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.AUTO_COMPLETE:
      return {
        ...state,
        ...action.payload,
        ...localStorage.setItem('inputValue', action.payload.inputValue),
      };

    case actionTypes.GET_TITLE_GET_INSITUTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
