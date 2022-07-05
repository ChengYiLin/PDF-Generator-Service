import styled from "styled-components";

export const A4Container = styled.div`
    @media print {
        width: 210mm;
        height: 297mm;
        page-break-inside: avoid;
    }
`;

export const GridArea = styled.div<{
    areaName: string;
    border?: boolean | undefined;
}>`
    grid-area: ${(props) => props.areaName};
    border: ${(props) => (props.border ? "1px solid black" : null)};
`;
