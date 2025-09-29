export type AuthData = {
  code: string;
  success: boolean;
};

export type AuthResponse = {
  success: boolean;
  data: AuthData;
};

export type AuthError = {
  message: string;
};
