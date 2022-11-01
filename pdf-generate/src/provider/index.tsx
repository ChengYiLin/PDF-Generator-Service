import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Example, { IExampleProps } from '../pages/Example';
import HCTLogistics, { IHCTLogisticsProps } from '../pages/HCTLogistics';

interface IRenderedComponentInfo {
    htmlString: string;
    styleString: string;
}

/**
 * Get the Component Html String
 * @returns html string for the Page
 */
function getRenderedComponentInfo(component: JSX.Element): string {
    const sheet = new ServerStyleSheet();

    const componentHtmlString = renderToString(sheet.collectStyles(component));
    const styleString = sheet.getStyleTags();

    sheet.seal();

    const htmlString = `
        <html>
            <head>
                ${styleString}
            </head>
            <body>
                ${componentHtmlString}
            </body>
        </html>
    `;

    return htmlString;
}

function getRenderedComponent(requestedPage: string, requestData: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const serverData = JSON.parse(requestData);

            switch (requestedPage) {
                case 'example':
                    resolve(getRenderedComponentInfo(<Example {...(serverData as IHCTLogisticsProps)} />));

                case 'hctLogistics':
                    resolve(getRenderedComponentInfo(<HCTLogistics {...(serverData as IHCTLogisticsProps)} />));

                default:
                    throw new Error('There is no matched template. Please check your request Path');
            }
        } catch (error) {
            error instanceof Error
                ? reject(error)
                : reject(new Error(`Unexpected error happened in getRenderedComponent function : ${error}`));
        }
    });
}

export default getRenderedComponent;
