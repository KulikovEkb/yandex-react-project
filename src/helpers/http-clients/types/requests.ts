export type TCreateOrderRequest = {
  ingredients: Array<string>;
};

export type TSendResetPasswordEmailRequest = {
  email: string;
};

export type TResetPasswordRequest = {
  password: string;
  token: string;
};

export type TRegisterRequest = {
  email: string;
  name: string;
  password: string;
}

export type TLoginRequest = {
  email: string;
  password: string;
}

export type TLogoutRequest = {
  token: string;
}

export type TRefreshTokenRequest = {
  token: string;
}

export type TEditUserRequest = {
  email: string;
  name: string;
  password: string;
}