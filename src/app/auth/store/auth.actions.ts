import { User } from '../model/auth.model';

export class LoginWithGoogle {
  static type = '[Auth] LoginWithGoogle';
}

export class LoginWithEmailAndPassword {
  static type = '[Auth] LoginWithEmailAndPassword';
  constructor(public email: string, public password: string) {}
}
export class Logout {
  static type = '[Auth] Logout';
}
export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}
export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public user: User) {}
}
export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public error: any) {}
}

export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}
