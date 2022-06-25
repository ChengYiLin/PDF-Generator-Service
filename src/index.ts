import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import HttpException from "./models/http-exception.model";

dotenv.config();

const app = express();

// API Service
app.use(routes);

app.get("/", (req: Request, res: Response) => {
    res.json({ status: "API is running on /api" });
});

// Error Handling
app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
        if (err && err.errorCode) {
            res.status(err.errorCode).json(err.message);
        } else if (err) {
            res.status(500).json(err.message);
        }
    }
);

/**
 * Server Activation
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`[server]: Server is running 1at http://localhost:${port}`);
});
