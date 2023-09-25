import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catch-async";
import { GetRequest } from "../utils/request-class/get-request";

export const testing = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        data: "testing successful"
    });
});

export const getAllPlans = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { planId } = req.query;
    const url = planId ? `${process.env.BASE_URL}//public/v2/Plans/${planId}` : `${process.env.BASE_URL}//public/v2/Plans`;
    const request = new GetRequest(url);
    const plans = await request.call();
    res.json(plans);
});