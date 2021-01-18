import { put } from 'redux-saga/effects'
import ErrorsActions from '../redux/_errors-redux'

const ErrorsSagas = {
  *raiseError({ error, status }) {
    yield put(ErrorsActions.failure(error, status))
  },

  *getError({ dataError, status }) {
    yield put(ErrorsActions.error(dataError, status))
  }
}

export default ErrorsSagas
