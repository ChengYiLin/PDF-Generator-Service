import { NextFunction, Request, Response, Router } from "express";

const router = Router();

/**
 * Generate PDF from Template Engine
 * @route {GET} /api/pdf/:pageName
 * @returns pdf file from Template
 */
router.get(
    "/pdf/:pageName",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json({ text: `PDF Service : ${req.params.pageName}` });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
