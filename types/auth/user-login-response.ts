//initialize login type
export type InitializeLoginResponse = {
  success: boolean;
  message: string;
  twoFactor: boolean;
};

//forgot password response
export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
  code: boolean;
  password: boolean;
};
