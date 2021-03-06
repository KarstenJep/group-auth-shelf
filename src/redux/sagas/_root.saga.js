import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import fetchShelfItems from './fetchShelfItems.saga';
import postItem from './postItem.saga';
import deleteShelfItem from './deleteShelfItem.saga';
import fetchMyShelfItems from './fetchMyShelfItems.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield takeEvery('POST_ITEM', postItem);
  yield takeEvery('DELETE_ITEM', deleteShelfItem);
  yield takeEvery('FETCH_ITEMS', fetchShelfItems);
  yield takeEvery('FETCH_MY_ITEMS', fetchMyShelfItems);
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
  ]);
}
