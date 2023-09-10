import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.insertIntoDB(
    req.body,
    req.user as JwtPayload
  );

  sendResponse<Order>(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order created successfully',
    data: result,
    success: true,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders(req.user as JwtPayload);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
    success: true,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getSingleOrder(
    req.params.orderId,
    req.user as JwtPayload
  );

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    message: 'Order retrieved successfully',
    data: result,
    success: true,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllOrders,
  getSingleOrder,
};
