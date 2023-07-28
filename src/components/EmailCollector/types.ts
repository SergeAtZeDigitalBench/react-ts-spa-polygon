export type Mode = "email_collect" | "password" | "current_user_email";

export interface IFormState {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
}
