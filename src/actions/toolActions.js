import * as toolConstants from '../constants/tool';

export const listAllTools = (params = {}) => {
  return {
    type: toolConstants.GET_ALL_TOOLS,
    payload: {
      params,
    }
  }
}
export const listAllToolsSuccess = (data) => {
  return {
    type: toolConstants.GET_ALL_TOOLS_SUCCESS,
    payload: data,
  }
}
export const listAllToolsFail = (error) => {
  return {
    type: toolConstants.GET_ALL_TOOLS_FAIL,
    payload: {
      error,
    }
  }
}

export const searchTools = (params = {}) => {
  return {
    type: toolConstants.SEARCH_TOOLS,
    payload: {
      params,
    }
  }
}
export const searchToolsSuccess = (data, params) => {
  return {
    type: toolConstants.SEARCH_TOOLS_SUCCESS,
    payload: { data, params },
  }
}
export const searchToolsFail = (error) => {
  return {
    type: toolConstants.SEARCH_TOOLS_FAIL,
    payload: {
      error,
    }
  }
}

export const getIdTool = (payload) => {
  return {
    type: toolConstants.GET_ID_TOOL,
    payload
  }
}
export const getIdToolSuccess = (payload) => {
  return {
    type: toolConstants.GET_ID_TOOL_SUCCESS,
    payload
  }
}
export const getIdToolFail = (payload) => {
  return {
    type: toolConstants.GET_ID_TOOL_FAIL,
    payload
  }
}
export const addTool = (payload) => {
  return {
    type: toolConstants.ADD_TOOL,
    payload,
  };
};

export const addToolSuccess = (payload) => {
  return {
    type: toolConstants.ADD_TOOL_SUCCESS,
    payload,
  };
};

export const addToolFail = (payload) => {
  return {
    type: toolConstants.ADD_TOOL_FAIL,
    payload,
  };
};

export const deleteTool = (payload) => {
  return {
    type: toolConstants.DELETE_TOOL,
    payload,
  };
};

export const deleteToolSuccess = (payload) => {
  return {
    type: toolConstants.DELETE_TOOL_SUCCESS,
    payload,
  };
};

export const deleteToolFail = (payload) => {
  return {
    type: toolConstants.DELETE_TOOL_FAIL,
    payload,
  };
};

export const updateTool = (payload) => {
  return {
    type: toolConstants.UPDATE_TOOL,
    payload,
  };
};
export const updateToolSuccess = (payload) => {
  return {
    type: toolConstants.UPDATE_TOOL_SUCCESS,
    payload,
  };
};

export const updateToolFail = (payload) => {
  return {
    type: toolConstants.UPDATE_TOOL_FAIL,
    payload,
  };
};


export const setToolEditing = (tool) => ({
  type: toolConstants.SET_TOOL_EDITING,
  payload: {
    tool,
  },
});