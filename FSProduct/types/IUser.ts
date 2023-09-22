export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  confirm_password: string;
  username: string;
}

export interface IUserResponse {
  id: string;
  email: string;
  username: string;
}
