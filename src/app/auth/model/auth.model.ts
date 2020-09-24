export type User = {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
};

export interface AuthStateModel {
  user?: User;
  loading?: boolean;
  error?: any;
}
