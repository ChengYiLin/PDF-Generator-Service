import React, { FC } from "react";
import styled from "styled-components";
import { PixelUnit, PercentageUnit } from "../types";

interface SVGContainerProps {
    imageWidth?: PixelUnit | PercentageUnit;
    imageHeight?: PixelUnit | PercentageUnit;
}

const SVGContainer = styled.div<SVGContainerProps>`
    line-height: 0;

    & > svg {
        width: ${(props) => props.imageWidth || "auto"};
        height: ${(props) => props.imageHeight || "auto"};
    }
`;

interface Props extends SVGContainerProps {
    svgDOMElement: string;
}

const BarCode: FC<Props> = ({ svgDOMElement, imageWidth, imageHeight }) => {
    return (
        <SVGContainer
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            dangerouslySetInnerHTML={{ __html: svgDOMElement }}
        ></SVGContainer>
    );
};

export default BarCode;
