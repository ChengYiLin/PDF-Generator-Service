import Example, { IExampleProps } from '../pages/Example';
import HCTLogistics, { IHCTLogisticsProps } from '../pages/HCTLogistics';

function getRenderedComponent(requestedPage: string, requestData: string): Promise<JSX.Element> {
    return new Promise((resolve, reject) => {
        try {
            const serverData = JSON.parse(requestData);

            switch (requestedPage) {
                case 'example':
                    resolve(<Example {...(serverData as IExampleProps)} />);

                case 'hctLogistics':
                    resolve(<HCTLogistics {...(serverData as IHCTLogisticsProps)} />);

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
