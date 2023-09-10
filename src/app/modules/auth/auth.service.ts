import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IUser } from '../users/user.inerface';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

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

// log in user
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // Check if the user exists in the database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  console.log('password 🔑', password);
  console.log('user 🔑', user.password);

  // Verify the password
  const isPasswordMatch = password === user?.password;

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Create accessToken and refreshToken
  const { email: userEmail, role } = user;

  const accessToken = jwtHelpers.createToken(
    {
      userEmail,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      userEmail,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userEmail } = verifiedToken;

  // Check if the user exists in the database
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Generate a new access token
  const newAccessToken = jwtHelpers.createToken(
    { email: user.email, role: user.role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return { accessToken: newAccessToken };
};

export const AuthService = {
  loginUser,
  refreshToken,
  createUser,
};
