import {AppActionCreator} from '~/store/actions/app/app';
import {adaptUserToClient} from '~/helpers/helpers';
import {
  ApiRoute,
  AppRoute,
  AuthStatus,
  UserActionType,
} from '~/common/enums/enums';

const UserActionCreator = {
  setAuthStatus: (status) => ({
    type: UserActionType.SET_AUTH_STATUS,
    payload: {
      status,
    },
  }),
  setUser: (user) => ({
    type: UserActionType.SET_USER,
    payload: {
      user,
    },
  }),
  checkAuth: () => (dispatch, _, {api}) => (
    api
      .get(ApiRoute.LOGIN)
      .then(({data}) =>
        dispatch(UserActionCreator.setUser(adaptUserToClient(data)))
      )
      .then(() => dispatch(UserActionCreator.setAuthStatus(AuthStatus.AUTH)))
      .catch((err) => dispatch(AppActionCreator.setError(err)))
  ),
  login: ({email, password}) => (dispatch, _, {api}) => (
    api
      .post(ApiRoute.LOGIN, {email, password})
      .then(({data}) =>
        dispatch(UserActionCreator.setUser(adaptUserToClient(data)))
      )
      .then(() => dispatch(UserActionCreator.setAuthStatus(AuthStatus.AUTH)))
      .then(() => dispatch(UserActionCreator.redirectToRoute(AppRoute.MAIN)))
      .catch((err) => dispatch(AppActionCreator.setError(err)))
  ),
  logout: () => (dispatch) => (
    Promise.resolve()
      .then(() => dispatch(UserActionCreator.setUser(null)))
      .then(() => dispatch(UserActionCreator.setAuthStatus(AuthStatus.NO_AUTH)))
      .then(() => dispatch(UserActionCreator.redirectToRoute(AppRoute.LOGIN)))
  ),
};

export {UserActionCreator};
