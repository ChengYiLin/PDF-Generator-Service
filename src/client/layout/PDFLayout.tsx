import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { ResetCSS } from "../styles/GlobalStyle";

const PaperLayout = styled.div`
    @page {
        size: A4;
        margin: 0;
        break-inside: avoid;
        break-after: always;
    }
`;

interface Props {
    children: ReactNode | ReactNode[];
}

const PDFLayout: FC<Props> = ({ children }) => {
    return (
        <PaperLayout>
            <ResetCSS />
            {children}
        </PaperLayout>
    );
};

export default PDFLayout;
