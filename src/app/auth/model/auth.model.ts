import { UserInfo } from 'firebase';

export type User = UserInfo;

export interface AuthStateModel {
  user?: User;
  loading?: boolean;
  error?: any;
}
