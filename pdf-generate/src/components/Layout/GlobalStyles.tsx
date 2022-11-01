import { createGlobalStyle } from 'styled-components';
import NotoSansPath from '../../fonts/NotoSansTC-Black.otf' assert { type: 'otf' };

export const FontStyles = createGlobalStyle`
    @font-face {
        font-family: 'NotoSans';
        src: url(${NotoSansPath}) format('otf'),
    }
`;

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'NotoSans', sans-serif;
    }
`;
