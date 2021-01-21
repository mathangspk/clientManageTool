import * as customerConstants from '../constants/customer';

export const listAllCustomers = (params = {}) => {
  return {
    type: customerConstants.GET_ALL_CUSTOMERS,
    payload: {
      params,
    }
  }
}
export const listAllCustomersSuccess = (data) => {
  return {
    type: customerConstants.GET_ALL_CUSTOMERS_SUCCESS,
    payload: data,
  }
}
export const listAllCustomersFail = (error) => {
  return {
    type: customerConstants.GET_ALL_CUSTOMERS_FAIL,
    payload: {
      error,
    }
  }
}
export const addCustomer = (payload) => {
  return {
    type: customerConstants.ADD_CUSTOMER,
    payload,
  };
};

export const addCustomerSuccess = (payload) => {
  return {
    type: customerConstants.ADD_CUSTOMER_SUCCESS,
    payload,
  };
};

export const addCustomerFail = (payload) => {
  return {
    type: customerConstants.ADD_CUSTOMER_FAIL,
    payload,
  };
};

export const deleteCustomer = (payload) => {
  return {
    type: customerConstants.DELETE_CUSTOMER,
    payload,
  };
};

export const deleteCustomerSuccess = (payload) => {
  return {
    type: customerConstants.DELETE_CUSTOMER_SUCCESS,
    payload,
  };
};

export const deleteCustomerFail = (payload) => {
  return {
    type: customerConstants.DELETE_CUSTOMER_FAIL,
    payload,
  };
};

export const updateCustomer = (payload) => {
  return {
    type: customerConstants.UPDATE_CUSTOMER,
    payload,
  };
};
export const updateCustomerSuccess = (payload) => {
  return {
    type: customerConstants.UPDATE_CUSTOMER_SUCCESS,
    payload,
  };
};

export const updateCustomerFail = (payload) => {
  return {
    type: customerConstants.UPDATE_CUSTOMER_FAIL,
    payload,
  };
};

export const setCustomerEditing = (customer) => ({
  type: customerConstants.SET_CUSTOMER_EDITING,
  payload: {
    customer,
  },
});