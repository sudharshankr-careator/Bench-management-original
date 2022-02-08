export type Store = {
  userSession: UserSessionType;
  filter: string;
};
export type UserSessionType = {
  user: LoginResponseType | null;
  error: string | null;
  store: Store | null;
};
export type LoginResponseType = {
  token: string;
  userid: string;
  email: string;
  username: string;
  role: string;
  firsttimelogin: boolean;
};
