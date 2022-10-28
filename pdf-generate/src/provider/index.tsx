import HelloWorld, { IHelloWorldProps } from '../pages/HelloWorld';
import TCat, { ITCatProps } from '../pages/TCat';

function getRenderedTemplate(requestedPage: string, requestData: string): Promise<JSX.Element> {
    return new Promise((resolve, reject) => {
        try {
            const serverData = JSON.parse(requestData);
            console.log(`Server Data : ${serverData}`);
            console.log(serverData);

            switch (requestedPage) {
                case 'helloWorld':
                    // TODO: Server Data Properties Check
                    resolve(<HelloWorld {...(serverData as IHelloWorldProps)} />);

                case 'tcat':
                    // TODO: Server Data Properties Check
                    resolve(<TCat {...(serverData as ITCatProps)} />);

                default:
                    throw new Error('There is no matched template. Please check your request Path');
            }
        } catch (error) {
            error instanceof Error
                ? reject(error)
                : reject(new Error(`Unexpected error happened in getRenderedTemplate function : ${error}`));
        }
    });
}

export default getRenderedTemplate;
