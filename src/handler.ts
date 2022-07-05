import express from "express";
import serverless from "serverless-http";
import apiRouter from "./routes/routes";
import httpErrorHandling from "./middleware/httpError.middleware";

const app = express();

// For parsing application/json & application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router For API
app.use(apiRouter);

// Error Handling
app.use(httpErrorHandling);

const handler = serverless(app);
export { handler };
