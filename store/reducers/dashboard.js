export const DashboardActions = {
  GET_USER_LIST_REQUEST: 'GET_USER_LIST_REQUEST',
  GET_USER_LIST_SUCCESS: 'GET_USER_LIST_SUCCESS',
  GET_USER_LIST_FAIL: 'GET_USER_LIST_FAIL',
  SET_LIST_EMPTY: 'SET_LIST_EMPTY',
};

const initialState = {
  loading: true,
  lists: [],
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case DashboardActions.GET_USER_LIST_REQUEST:
      return { ...state, loading: true };
    case DashboardActions.GET_USER_LIST_SUCCESS:
      let res = null;
      if (action?.payload?.data?.items) {
        res = [...state.lists, ...action?.payload?.data?.items];
      } else {
        res = action?.payload?.data;
      }

      return {
        ...state,
        loading: false,
        lists: res,
      };
    case DashboardActions.GET_USER_LIST_FAIL:
      return { ...state, loading: false, lists: [] };

    case DashboardActions.SET_LIST_EMPTY:
      return { ...state, loading: false, lists: [] };

    default:
      return state;
  }
};
