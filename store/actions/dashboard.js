import { Actions } from '../../constants';
import { DashboardActions } from '../reducers/dashboard.js';

export const getUserList = (dispatch, params) => {
  return new Promise((resolve, reject) => {
    const onSuccess = async (payload) => {
      dispatch({
        type: DashboardActions.GET_USER_LIST_SUCCESS,
        payload,
      });
      resolve(payload);
    };

    const onFail = (err) => {
      dispatch({
        type: DashboardActions.GET_USER_LIST_FAIL,
        payload: err,
      });
      reject(err);
    };

    dispatch({
      type: DashboardActions.GET_USER_LIST_REQUEST,
    });

    dispatch({
      type: Actions.API_REQUEST,
      method: 'GET',
      url: `https://api.github.com/search/users`,
      params,
      onSuccess,
      onFail,
    });
  });
};

export const resetList = (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: DashboardActions.SET_LIST_EMPTY,
    });
  });
};
