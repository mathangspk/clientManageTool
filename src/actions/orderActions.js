import * as orderConstants from '../constants/order';

export const listAllOrders = (params = {}) => {
  return {
    type: orderConstants.GET_ALL_ORDERS,
    payload: {
      params,
    }
  }
}
export const listAllOrdersSuccess = (data) => {
  return {
    type: orderConstants.GET_ALL_ORDERS_SUCCESS,
    payload: data,
  }
}
export const listAllOrdersFail = (error) => {
  return {
    type: orderConstants.GET_ALL_ORDERS_FAIL,
    payload: {
      error,
    }
  }
}
export const searchOrder = (params = {}) => {
  return {
    type: orderConstants.SEARCH_ORDER,
    payload: {
      params,
    }
  }
}
export const searchOrderSuccess = (data, params) => {
  return {
    type: orderConstants.SEARCH_ORDER_SUCCESS,
    payload: { data, params }
  }
}
export const searchOrderFail = (error) => {
  return {
    type: orderConstants.SEARCH_ORDER_FAIL,
    payload: {
      error,
    }
  }
}
export const getIdOrder = (payload) => {
  return {
    type: orderConstants.GET_ID_ORDER,
    payload
  }
}
export const getIdOrderSuccess = (payload) => {
  return {
    type: orderConstants.GET_ID_ORDER_SUCCESS,
    payload
  }
}
export const getIdOrderFail = (payload) => {
  return {
    type: orderConstants.GET_ID_ORDER_FAIL,
    payload
  }
}
export const addOrder = (payload) => {
  return {
    type: orderConstants.ADD_ORDER,
    payload,
  };
};

export const addOrderSuccess = (payload) => {
  return {
    type: orderConstants.ADD_ORDER_SUCCESS,
    payload,
  };
};

export const addOrderFail = (payload) => {
  return {
    type: orderConstants.ADD_ORDER_FAIL,
    payload,
  };
};

export const deleteOrder = (payload, params) => {
  return {
    type: orderConstants.DELETE_ORDER,
    payload: {
      ...payload,
      params
    },
  };
};

export const deleteOrderSuccess = (payload) => {
  return {
    type: orderConstants.DELETE_ORDER_SUCCESS,
    payload,
  };
};

export const deleteOrderFail = (payload) => {
  return {
    type: orderConstants.DELETE_ORDER_FAIL,
    payload,
  };
};

export const updateOrder = (payload) => {
  return {
    type: orderConstants.UPDATE_ORDER,
    payload,
  };
};

export const updateOrderSuccess = (payload) => {
  return {
    type: orderConstants.UPDATE_ORDER_SUCCESS,
    payload,
  };
};

export const updateOrderNote = (payload) => {
  return {
    type: orderConstants.UPDATE_ORDER_NOTE,
    payload,
  };
};

export const updateOrderFail = (payload) => {
  return {
    type: orderConstants.UPDATE_ORDER_FAIL,
    payload,
  };
};


export const setOrderEditing = (order) => ({
  type: orderConstants.SET_ORDER_EDITING,
  payload: {
    order,
  },
});