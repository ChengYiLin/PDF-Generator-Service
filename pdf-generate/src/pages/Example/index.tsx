import { FC } from 'react';

export type IExampleProps = {
    name: string;
};

// Create Document Component
const Example: FC<IExampleProps> = ({ name }) => {
    return (
        <div>
            <h1>Example</h1>
        </div>
    );
};

export default Example;
