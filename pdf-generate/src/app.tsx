import ReactPDF, { Font } from '@react-pdf/renderer';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import getRenderedTemplate from './provider';
import fontFamilyPath from './fonts/NotoSansTC-Black.otf' assert { type: 'otf' };

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {
        if (!event.pathParameters) {
            throw new Error('There is no pathParameters. Please check your path match formate : `/pdf/<pageTemplate>`');
        }

        if (!event.body && event.body !== '') {
            throw new Error('There is no request body. Please check your request Data!');
        }

        Font.register({
            family: 'NotoSansTC',
            src: fontFamilyPath,
        });

        await Font.load({ fontFamily: 'NotoSansTC' });

        console.log(Font.getFont({ fontFamily: 'NotoSansTC' })?.data);

        const requestTemplate = event.pathParameters['pageTemplate'] || '';
        const requestData = event.body;
        const renderedTemplate = await getRenderedTemplate(requestTemplate, requestData);
        const pdfFile = await ReactPDF.renderToString(renderedTemplate);

        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/pdf',
            },
            isBase64Encoded: true,
            body: pdfFile,
        };
    } catch (err: unknown) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? `Here ${err.message}` : 'some error happened',
            }),
        };
    }

    return response;
};
