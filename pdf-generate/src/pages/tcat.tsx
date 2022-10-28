import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC } from 'react';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#d7ffd0',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

export interface ITCatProps {
    name: string;
}

// Create Document Component
const TCat: FC<ITCatProps> = ({ name }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>T-cat</Text>
                    <Text>{name || 'T-Cat'}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default TCat;
