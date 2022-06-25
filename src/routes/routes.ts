import { Router } from "express";
import pdfController from "../controllers/pdf.controller";

const api = Router().use(pdfController);

export default Router().use("/api", api);
