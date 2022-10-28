import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fffed5',
    },
    section: {
        margin: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
});

export type IHelloWorldProps = {
    name: string;
};

// Create Document Component
const HelloWorld: FC<IHelloWorldProps> = ({ name }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Hello, React PDF</Text>
                    <Text>This is the value from props 'name' : {name || 'undefined'}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default HelloWorld;
