import {TIngredient} from "../../types/ingredient";

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TGetIngredientsResponse = TServerResponse<{ data: Array<TIngredient> }>;

export type TCreateOrderResponse = TServerResponse<{
  name: string;
  order: {
    number: number;
  };
}>;

export type TSendResetPasswordEmailResponse = TServerResponse<{ message: string }>;

export type TResetPasswordResponse = TServerResponse<{ message: string }>;

export type TRegisterResponse = TServerResponse<{ user: TUser & TTokens; }>;

export type TLoginResponse = TServerResponse<{ user: TUser & TTokens }>;

export type TLogoutResponse = TServerResponse<{ message: string }>;

export type TGetUserResponse = TServerResponse<{ user: TUser }>;

export type TEditUserResponse = TServerResponse<{ user: TUser }>;

export type TRefreshTokenResponse = TServerResponse<TTokens>;

type TUser = {
  email: string;
  name: string;
};

type TTokens = {
  accessToken: string;
  refreshToken: string;
};