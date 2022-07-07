import express from "express";
import serverless, { Handler } from "serverless-http";
import apiRouter from "./routes/routes";
import httpErrorHandling from "./middleware/httpError.middleware";

const app = express();

// Router For API
app.use(apiRouter);

// Error Handling
app.use(httpErrorHandling);

const handle: Handler = serverless(app);
exports.handler = async (event: Object, context: Object) => {
    let handler = await handle(event, context);
    handler = Object.assign(handler, { ...handler, isBase64Encoded: true });

    return handler;
};
