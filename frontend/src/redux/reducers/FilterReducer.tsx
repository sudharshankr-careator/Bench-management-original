import CURD_ACTIONS from "../actions/FilterActions";

const initialstate = "";

function filterReducer(state: string = initialstate, action: any) {
  switch (action.type) {
    case CURD_ACTIONS.ACTION_TYPES.DATA:
      return action;

    default:
      return state;
  }
}

export default filterReducer;
