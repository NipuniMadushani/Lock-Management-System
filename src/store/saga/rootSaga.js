import { takeLatest } from 'redux-saga/effects';
import {
    CHECK_CUSTOMER_CODE_DUPLICATE,
    GET_ALL_ACTIVE_CUSTOMER_DATA,
    GET_ALL_CUSTOMER_DATA,
    GET_CUSTOMER_DETAILS_BY_CODE,
    GET_CUSTOMER_LAST_MODIFIED_DATE_TIME,
    SAVE_CUSTOMER_DATA,
    UPDATE_CUSTOMER_DATA
} from 'store/constant/CustomerConstant';

import {
    checkCustomerDupicateCodeSaga,
    getAllActiveCustomerDataSaga,
    getAllCustomerDataSaga,
    getCustomerDetailsByCodeSaga,
    getCustomerLatestModifiedDateSaga,
    saveCustomerDataHandler,
    updateCustomerDataSaga
} from './CustomerSaga';

export function* wacherSaga() {
    // //Market

    yield takeLatest(SAVE_CUSTOMER_DATA, saveCustomerDataHandler);
    yield takeLatest(GET_ALL_CUSTOMER_DATA, getAllCustomerDataSaga);
    yield takeLatest(GET_CUSTOMER_DETAILS_BY_CODE, getCustomerDetailsByCodeSaga);
    yield takeLatest(GET_CUSTOMER_LAST_MODIFIED_DATE_TIME, getCustomerLatestModifiedDateSaga);
    yield takeLatest(CHECK_CUSTOMER_CODE_DUPLICATE, checkCustomerDupicateCodeSaga);
    yield takeLatest(UPDATE_CUSTOMER_DATA, updateCustomerDataSaga);
    yield takeLatest(GET_ALL_ACTIVE_CUSTOMER_DATA, getAllActiveCustomerDataSaga);
}
