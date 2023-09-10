import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // const { student, ...userData } = req.body;
    // const result = await UserService.createStudent(student, userData);
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'user created successfully',
    //   data: result,
    // });
    console.log('UserController');
  }
);

// const createFaculty: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { faculty, ...userData } = req.body;

//     const result = await UserService.createFaculty(faculty, userData);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'user created successfully',
//       data: result,
//     });
//   }
// );

// const createAdmin: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { admin, ...userData } = req.body;
//     const result = await UserService.createAdmin(admin, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Admin created successfully!',
//       data: result,
//     });
//   }
// );

export const UserController = {
  createStudent,
  //   createFaculty,
  //   createAdmin,
};
