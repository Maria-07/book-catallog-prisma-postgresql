import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUser } from '../users/user.inerface';

// create a user through sign in
// Create a user through sign up
const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const result = await prisma.user.create({
      data: user, // Pass the user object directly
    });

    return result;
  } catch (error) {
    // Handle any potential errors, e.g., duplicate email
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not create');
  }
};

// const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;

//   // console.log(payload);

//   const isUserExist = await User.isUserExist(email);
//   // console.log('isisUserExist', isUserExist);

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   // match password
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatch(password, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
//   }

//   // create accessToken and refreshToken
//   const { email: userEmail, role } = isUserExist;

//   const accessToken = jwtHelpers.createToken(
//     {
//       userEmail,
//       role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expire_in as string
//   );

//   const refreshToken = jwtHelpers.createToken(
//     {
//       userEmail,
//       role,
//     },
//     config.jwt.refresh_secret as Secret,
//     config.jwt.refresh_expire_in as string
//   );

//   console.log('{ accessToken, refreshToken }', { accessToken, refreshToken });

//   return { accessToken, refreshToken };
// };

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifiedToken = null;

//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { userEmail } = verifiedToken;
//   console.log('verifiedToken', verifiedToken);

//   const isUserExist = await User.isUserExist(userEmail);
//   // console.log('isUserExist', isUserExist);

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   // generate new token
//   const newAccessToken = jwtHelpers.createToken(
//     { email: isUserExist.email, role: isUserExist.role },
//     config.jwt.secret as Secret,
//     config.jwt.expire_in as string
//   );

//   return { accessToken: newAccessToken };
// };

export const AuthService = {
  //   loginUser,
  //   refreshToken,
  createUser,
};
