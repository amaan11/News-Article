import { FETCH_NEWS_ARTICLE_SUCCESS } from "../action/types";
const intialState = {
  articles: []
};

export default function dashboardReducer(state = intialState, action) {
  switch (action.type) {
    case FETCH_NEWS_ARTICLE_SUCCESS:
      return { ...state, articles: action.response };
    default:
      return state;
  }
}
