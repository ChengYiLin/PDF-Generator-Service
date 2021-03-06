import React from "react";
import { Router, Request, Response, NextFunction } from "express";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import ECanConsignmentNote from "../client/pages/ecan/consignmentNote";
import { ECanConsignmentNoteReqModel } from "../model/ecanConsignmentNote.model";
import { getSVGBarCode } from "../utils/barcode.utility";
import generatePDFBuffer from "../utils/pdf.utility";
import handleRender from "../utils/handleRender.utility";

const router = Router();

/**
 * 宅配通匯出託運單
 */
router.post(
    "/ecan/consignmentNote",
    async (req: Request, res: Response, next: NextFunction) => {
        const sheet = new ServerStyleSheet();

        try {
            const reqData: ECanConsignmentNoteReqModel[] = JSON.parse(req.body);

            process.env.FONTCONFIG_PATH = "/var/task/fonts";

            // Generate BarCode SCG Element
            const preloadServerData: ECanConsignmentNoteReqModel[] =
                reqData.map((reqData) => ({
                    ...reqData,
                    OuterCodeBarcode: getSVGBarCode(reqData.OuterCodeBarcode, {
                        format: "CODE128",
                        width: 2,
                        height: 50,
                        margin: 5,
                    }),
                    ForwarderPostalCodeBarcode: getSVGBarCode(
                        reqData.ForwarderPostalCodeBarcode,
                        {
                            format: "CODE128",
                            width: 2,
                            height: 35,
                            margin: 0,
                        }
                    ),
                    SupplierCodeBarcode: getSVGBarCode(
                        reqData.SupplierCodeBarcode,
                        {
                            format: "CODE128",
                            width: 2,
                            height: 30,
                        }
                    ),
                }));

            // Generate Html template through React SSR
            const componentHtmlString = renderToString(
                sheet.collectStyles(
                    <ECanConsignmentNote serverData={preloadServerData} />
                )
            );

            const styledComponentsHtmlString = sheet.getStyleTags();

            const pdfHtmlString = handleRender(
                componentHtmlString,
                styledComponentsHtmlString
            );

            const pdf = await generatePDFBuffer(pdfHtmlString);

            res.setHeader("Content-Type", "application/pdf");
            res.send(pdf.toString("base64"));

            // res.setHeader("Content-Type", "text/html");
            // res.send(pdfHtmlString);
        } catch (error) {
            console.log(error);
            next(error);
        } finally {
            sheet.seal();
        }
    }
);

export default router;
