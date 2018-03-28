import { put, call, takeLatest } from 'redux-saga/effects';
import {
  showLoading,
  hideLoading,
  resetLoading,
} from 'react-redux-loading-bar';
import api from '../utils/api/api';

import { setError } from './application';

export const ROLES_REQUESTED = 'ROLES_REQUESTED';
export const requestRoles = () => ({
  type: ROLES_REQUESTED,
  payload: {},
});

export const ROLES_LOADED = 'ROLES_LOADED';
function* loadRoles() {
  try {
    yield put(resetLoading());
    yield put(showLoading());
    const roles = yield call(api, 'roles');
    yield put({
      type: ROLES_LOADED,
      payload: {
        roles,
      },
    });
  } catch (error) {
    yield put(setError(error));
  } finally {
    yield put(hideLoading());
  }
}

export default function* watchRequestedRoles() {
  yield takeLatest(ROLES_REQUESTED, loadRoles);
}