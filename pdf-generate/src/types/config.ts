import { FC } from 'react';
import { IHelloWorldProps } from '../pages/HelloWorld';
import { ITCatProps } from '../pages/TCat';

export interface IPagesConfig {
    helloWorld: FC<IHelloWorldProps>;
    tcat: FC<ITCatProps>;
}

export type PagesType = keyof IPagesConfig;

export type PagesPropType = IHelloWorldProps | ITCatProps;
