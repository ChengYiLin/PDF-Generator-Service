import express from "express";
import serverless from "serverless-http";
import apiRouter from "./routes/routes";
import httpErrorHandling from "./middleware/httpError.middleware";

const app = express();

// Router For API
app.use(apiRouter);

// Error Handling
app.use(httpErrorHandling);

const handler = serverless(app);
exports.handler = async (event: Object, context: Object) => {
    return await handler(event, context);
};
