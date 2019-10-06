import { put, call, fork, takeLatest } from "redux-saga/effects";
import Auth from "../Services/Auth";
import { FETCH_NEWS_ARTICLE_REQUEST } from "../redux/action/types";
import { fetchNewsArticleSuccess } from "../redux/action/dashboard";

function fetchNewsArticleApi() {
  return Auth.newsArticle();
}

function* fetchNewsArticleSaga() {
  try {
    const response = yield call(fetchNewsArticleApi);
    yield put(fetchNewsArticleSuccess(response));
  } catch (error) {
    // yield put(loginFailed(error.data.message));
  }
}

function* fetchNewsArticleListener() {
  yield takeLatest(FETCH_NEWS_ARTICLE_REQUEST, fetchNewsArticleSaga);
}

export default function* authSaga() {
  yield fork(fetchNewsArticleListener);
}
