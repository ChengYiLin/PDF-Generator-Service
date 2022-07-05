import express from "express"
import serverless from "serverless-http"

const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello AWS Lambda Yo Yo",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

const handler = serverless(app);
export { handler }