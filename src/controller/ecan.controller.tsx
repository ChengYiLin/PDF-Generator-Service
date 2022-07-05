import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/**
 * 宅配通匯出託運單
 */
router.post(
    "/ecan/consignmentNote",
    async (req: Request, res: Response, next: NextFunction) => {
        res.json({
            message: "Hello Controller",
        });
    }
);

export default router;
