import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

//! Get all users
const allUsers = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany();
  return result;
};

//! get a single user
const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

//! update user
const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

//! Delete user
const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

// get user profile
const getUserProfile = async (id: string): Promise<User> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }

  return result;
};

export const UserService = {
  allUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserProfile,
};
