import {
    CHECK_CUSTOMER_CODE_DUPLICATE,
    GET_ALL_ACTIVE_CUSTOMER_DATA,
    GET_ALL_CUSTOMER_DATA,
    GET_CUSTOMER_DETAILS_BY_CODE,
    GET_CUSTOMER_LAST_MODIFIED_DATE_TIME,
    SAVE_CUSTOMER_DATA,
    UPDATE_CUSTOMER_DATA
} from '../../../constant/master/CustomerConstant';

export const saveCustomerData = (data) => {
    console.log('saveManagerData action s called', data);
    return {
        type: SAVE_CUSTOMER_DATA,
        data
    };
};
export const getAllCustomerData = () => {
    return {
        type: GET_ALL_CUSTOMER_DATA
    };
};

export const getLatestModifiedDetails = () => {
    return {
        type: GET_CUSTOMER_LAST_MODIFIED_DATE_TIME
    };
};

export const getCustomerDetailsByCode = (id) => {
    return {
        type: GET_CUSTOMER_DETAILS_BY_CODE,
        data: { id }
    };
};

export const updateCustomerData = (data) => {
    return {
        type: UPDATE_CUSTOMER_DATA,
        data
    };
};

export const checkDuplicateCustomersCode = (data) => {
    return {
        type: CHECK_CUSTOMER_CODE_DUPLICATE,
        data: data
    };
};

export const getAllActiveCustomerData = () => {
    return {
        type: GET_ALL_ACTIVE_CUSTOMER_DATA
    };
};
