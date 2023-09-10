export type IRole = 'customer' | 'admin';

export type IUser = {
  role: IRole;
  password: string;
  email: string;
  name: string;
  contactNo: string;
  address: string;
  profileImg: string;
};
