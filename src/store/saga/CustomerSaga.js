import { get, getById, update, create } from 'apis/Apis';
import { put, takeEvery, call } from 'redux-saga/effects';

import {
    ADD_FAILED_CUSTOMER_DATA,
    ADD_SUCCESS_CUSTOMER_DATA,
    FAILED_GET_ALL_ACTIVE_CUSTOMER_DATA,
    FAILED_GET_ALL_CUSTOMER_DATA,
    FAILED_GET_CUSTOMER_DETAILS_BY_CODE,
    FAILED_GET_CUSTOMER_LAST_MODIFIED_DATE_TIME,
    CUSTOMER_CODE_DUPLICATE,
    SUCCESS_GET_ALL_ACTIVE_CUSTOMER_DATA,
    SUCCESS_GET_ALL_CUSTOMER_DATA,
    SUCCESS_GET_CUSTOMER_DETAILS_BY_CODE,
    SUCCESS_GET_CUSTOMER_LAST_MODIFIED_DATE_TIME,
    UPDATE_FAILED_CUSTOMER_DATA,
    UPDATE_SUCCESS_CUSTOMER_DATA
} from 'store/constant/CustomerConstant';

export function* getAllCustomerDataSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_LOCK_HOOD_URL}/Customer/`);
        yield put({ type: SUCCESS_GET_ALL_CUSTOMER_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ALL_CUSTOMER_DATA, data: responseData.data });
    }
}

export function* getCustomerLatestModifiedDateSaga() {
    console.log('latest date');
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_LOCK_HOOD_URL}/Customer/lastModifiedTime`);
        yield put({
            type: SUCCESS_GET_CUSTOMER_LAST_MODIFIED_DATE_TIME,
            data: responseData.data
        });
    } catch (e) {
        yield put({ type: FAILED_GET_CUSTOMER_LAST_MODIFIED_DATE_TIME, data: '' });
    }
}

export function* saveCustomerDataHandler(action) {
    action.data.path = `${process.env.REACT_APP_LOCK_HOOD_URL}/Customer/`;
    let responseData = [];
    try {
        responseData = yield call(create, action.data);

        yield put({ type: ADD_SUCCESS_CUSTOMER_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: ADD_FAILED_CUSTOMER_DATA, data: responseData.data });
    }
}

export function* getCustomerDetailsByCodeSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_LOCK_HOOD_URL}/Customer/${action.data.id}`);
        yield put({ type: SUCCESS_GET_CUSTOMER_DETAILS_BY_CODE, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_CUSTOMER_DETAILS_BY_CODE, data: responseData.data });
    }
}

export function* updateCustomerDataSaga(action) {
    action.data.path = `${process.env.REACT_APP_LOCK_HOOD_URL}/Customer/${action.data.code}`;
    let responseData = [];
    try {
        responseData = yield call(update, action.data);
        yield put({ type: UPDATE_SUCCESS_CUSTOMER_DATA, data: responseData.data });
    } catch (e) {
        console.log(e);
        yield put({ type: UPDATE_FAILED_CUSTOMER_DATA, data: responseData.data });
    }
}

export function* checkCustomerDupicateCodeSaga(action) {
    let responseData = [];
    try {
        responseData = yield call(getById, `${process.env.REACT_APP_LOCK_HOOD_URL}/Customer/codeDuplicate/${action.data}`);
        console.log(responseData);
        yield put({ type: CUSTOMER_CODE_DUPLICATE, data: responseData.data });
    } catch (e) {
        console.log(responseData);
        yield put({ type: CUSTOMER_CODE_DUPLICATE, data: responseData });
    }
}

export function* getAllActiveCustomerDataSaga() {
    let responseData = [];
    try {
        responseData = yield call(get, `${process.env.REACT_APP_LOCK_HOOD_URL}/Customer/active`);
        yield put({ type: SUCCESS_GET_ALL_ACTIVE_CUSTOMER_DATA, data: responseData.data });
    } catch (e) {
        yield put({ type: FAILED_GET_ALL_ACTIVE_CUSTOMER_DATA, data: responseData.data });
    }
}
