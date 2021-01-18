import {call, put} from 'redux-saga/effects'

import {commonService} from '../services'
import QuestionRedux from '../redux/_question-redux'
import { HttpStatus } from '../constants'

const QuestionSagas = {
  * category({data}) {
    let response = yield call(commonService.questionCategory, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.category = true
      yield put(QuestionRedux.categorySuccess(responsedata))
    } else {
      yield put(QuestionRedux.questionFailure(responsedata, response.status))
    }
  },
  * questions({data}) {
    let response = yield call(commonService.questionList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.questions = true
      yield put(QuestionRedux.questionsSuccess(responsedata))
    } else {
      yield put(QuestionRedux.questionFailure(responsedata, response.status))
    }
  },
  * question() {
    let response = yield call(commonService.questionCategory)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.question = true
      yield put(QuestionRedux.questionSuccess(responsedata))
    } else {
      yield put(QuestionRedux.questionFailure(responsedata, response.status))
    }
  },
}

export default QuestionSagas
