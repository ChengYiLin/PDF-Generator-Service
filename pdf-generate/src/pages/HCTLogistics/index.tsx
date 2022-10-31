import { Document, Page, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';
import { SixInOneLayout } from '../../styles/Layout';
import Styles from './style';

export interface IHCTLogisticsProps {
    name: string;
}

const HCTLogistics: FC<IHCTLogisticsProps> = ({ name }) => {
    const test = Array.from(Array(5).keys());

    return (
        <Document>
            <Page size="A4" style={SixInOneLayout.page}>
                {test.map((item, index) => (
                    <View
                        style={[SixInOneLayout.pageOutline, Styles.shippingLabelContainer]}
                        key={`HCTLogistics_${index}`}
                    >
                        <View style={Styles.shippingLabelOutline}>
                            <View style={[Styles['rawHeight-12'], Styles['border-bottom']]}></View>
                            <View style={[Styles['rawHeight-20'], Styles['border-bottom']]}></View>
                            <View style={[Styles['rawHeight-20'], Styles['border-bottom']]}></View>
                            <View style={[Styles['rawHeight-20'], Styles['border-bottom']]}>
                                <Text>Hello World</Text>
                            </View>
                            <View style={[Styles['rawHeight-14'], Styles['border-bottom']]}>
                                <Text>備註</Text>
                            </View>
                            <View style={Styles['rawHeight-14']}>
                                <Text>寄貨人</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default HCTLogistics;
