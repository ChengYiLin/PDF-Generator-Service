import { Document, Page, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';
import Styles from './style';

export type IExampleProps = {
    name: string;
};

// Create Document Component
const Example: FC<IExampleProps> = ({ name }) => {
    return (
        <Document>
            <Page size="A4" style={Styles.page}>
                <View style={Styles.section}>
                    <Text>This is the value from props 'name' : {name || 'undefined'}</Text>
                    <View>
                        <Text style={Styles.title}>我是 PDF，測試測試</Text>
                    </View>
                    <View>
                        <Text style={Styles.title}>我是寄件人</Text>
                    </View>
                    <View>
                        <Text style={Styles.title}>我是收款人</Text>
                    </View>
                    <Text style={Styles.title}>我是備註</Text>
                    <Text style={Styles.title}>我是指定日期</Text>
                    <Text style={Styles.title}>我是明日之星</Text>
                </View>
            </Page>
        </Document>
    );
};

export default Example;
