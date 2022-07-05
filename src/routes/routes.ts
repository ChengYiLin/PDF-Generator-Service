import { Router } from "express";
import ecanController from "../controller/ecan.controller";

const api = Router().use(ecanController);

const apiRouter = Router().use("/api", api);

export default apiRouter;
