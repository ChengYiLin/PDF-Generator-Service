import JsBarcode, { BaseOptions } from "jsbarcode";
import { XMLSerializer, DOMImplementation } from "xmldom";

/**
 * Generate SVG BarCode HTML String
 * @param { string } barCodeValue
 * @param { BarCodeSetting } options Customize BarCode Setting based on packable `JSBarCode`
 * @return {string} BarCode SVG Html String
 */
export const getSVGBarCode = (
    barCodeValue: string,
    options: BaseOptions
): string => {
    const document = new DOMImplementation().createDocument(
        "http://www.w3.org/1999/xhtml",
        "html",
        null
    );
    const svgNode = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    JsBarcode(svgNode, barCodeValue, {
        xmlDocument: document,
        format: options.format || "CODE128",
        width: options.width || 2,
        height: options.height || 50,
        displayValue: options.displayValue || false,
        margin: options.margin || 0,
        marginTop: options.marginTop || 0,
        marginBottom: options.marginBottom || 0,
        marginLeft: options.marginLeft || 0,
        marginRight: options.marginTop || 0,
    });

    const xmlSerializer = new XMLSerializer();
    const svgHtmlString = xmlSerializer.serializeToString(svgNode);

    return svgHtmlString;
};
