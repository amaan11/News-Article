import {
  FETCH_NEWS_ARTICLE_REQUEST,
  FETCH_NEWS_ARTICLE_SUCCESS
} from "./types";
export const fetchNewsArticleRequest = () => {
  return {
    type: FETCH_NEWS_ARTICLE_REQUEST
  };
};
export const fetchNewsArticleSuccess = response => {
  return {
    type: FETCH_NEWS_ARTICLE_SUCCESS,
    response
  };
};
