import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import getRenderedComponent from './provider';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {
        if (!event.pathParameters) {
            throw new Error('There is no pathParameters. Please check your path match formate : `/pdf/<pageTemplate>`');
        }

        if (!event.body && event.body !== '') {
            throw new Error('There is no request body. Please check your request Data!');
        }

        const requestTemplate = event.pathParameters['pageTemplate'] || '';
        const requestData = event.body;
        const htmlString = await getRenderedComponent(requestTemplate, requestData);

        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html; charset=UTF-8',
            },
            isBase64Encoded: true,
            body: htmlString,
        };
    } catch (err: unknown) {
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};
