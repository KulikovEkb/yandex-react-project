import {authReducer} from "./auth-reducer";
import {
  CHECK_AUTH,
  EDIT_USER_FAILED,
  GET_USER_FAILED, LOGIN_FAILED, LOGOUT_FAILED, REGISTER_FAILED, RESET_PASSWORD_FAILED,
  RESET_PASSWORD_FINISHED,
  RESET_PASSWORD_STARTED, SEND_RESET_PASSWORD_EMAIL_FAILED,
  SET_USER
} from "./auth-actions";

const initialState = {
  authChecked: false,
  user: null,
  resetPasswordStarted: false,
  resetPasswordFinished: false,
  getUserFailed: false,
  editUserFailed: false,
  registerFailed: false,
  loginFailed: false,
  logoutFailed: false,
  resetPasswordFailed: false,
  sendResetPasswordEmailFailed: false,
};

describe('auth reducer', function () {
  it('should return the initial state', function () {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should set auth checked', function () {
    expect(authReducer({...initialState}, {type: CHECK_AUTH}))
      .toEqual({...initialState, authChecked: true})
  });

  it('should set user', function () {
    const user = {name: 'user name', email: 'user email'};

    expect(authReducer({...initialState}, {type: SET_USER, user: {...user}}))
      .toEqual({...initialState, user: {...user}})
  });

  it('should set password reset started', function () {
    expect(authReducer({...initialState}, {type: RESET_PASSWORD_STARTED}))
      .toEqual({...initialState, resetPasswordStarted: true})
  });

  it('should set password reset finished', function () {
    expect(authReducer({...initialState}, {type: RESET_PASSWORD_FINISHED}))
      .toEqual({...initialState, resetPasswordStarted: false, resetPasswordFinished: true})
  });

  it('should set user receiving failed', function () {
    expect(authReducer({...initialState}, {type: GET_USER_FAILED}))
      .toEqual({...initialState, getUserFailed: true})
  });

  it('should set user editing failed', function () {
    expect(authReducer({...initialState}, {type: EDIT_USER_FAILED}))
      .toEqual({...initialState, editUserFailed: true})
  });

  it('should set registration failed', function () {
    expect(authReducer({...initialState}, {type: REGISTER_FAILED}))
      .toEqual({...initialState, registerFailed: true})
  });

  it('should set login failed', function () {
    expect(authReducer({...initialState}, {type: LOGIN_FAILED}))
      .toEqual({...initialState, loginFailed: true})
  });

  it('should set logout failed', function () {
    expect(authReducer({...initialState}, {type: LOGOUT_FAILED}))
      .toEqual({...initialState, logoutFailed: true})
  });

  it('should set password reset failed', function () {
    expect(authReducer({...initialState}, {type: RESET_PASSWORD_FAILED}))
      .toEqual({...initialState, resetPasswordFailed: true})
  });

  it('should set password resetting email sending failed', function () {
    expect(authReducer({...initialState}, {type: SEND_RESET_PASSWORD_EMAIL_FAILED}))
      .toEqual({...initialState, sendResetPasswordEmailFailed: true})
  });
});