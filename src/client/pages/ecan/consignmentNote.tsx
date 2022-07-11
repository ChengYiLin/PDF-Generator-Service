import React, { FC } from "react";
import styled from "styled-components";
import _ from "lodash";
import PaperLayout from "../../layout/PDFLayout";
import { A4Container, GridArea } from "../../styles/common.style";
import { ECanConsignmentNoteReqModel } from "../../../model/ecanConsignmentNote.model";
import BarCode from "../../components/BarCode";
import { PointUnit } from "../../types";

// 列印紙 切版
const PageContainer = styled(A4Container)`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
`;

// 託運單 切版
const ConsignmentNoteContainer = styled.div`
    display: grid;
    grid-template-columns: 20pt 8.5fr 9.5fr 20pt;
    padding-bottom: 10px;
    grid-template-areas: "Blank DeliveryNote ReceiptNote CollectionText";
    grid-column-gap: 0 5mm 0;
`;

// 配送及收執聯 切版
const DeliveryNoteContainer = styled.div<{ areaName: string }>`
    grid-area: ${(props) => props.areaName};

    display: grid;
    grid-template-rows: 45pt 14pt auto;
    grid-template-areas:
        "OuterCodeBarCode"
        "PrintInfo"
        "Note_Info";
`;

// 印單日期
const PrintInfo = styled.div`
    grid-are: PrintInfo;
    font-size: 12pt;
`;

// 文字：有代收款
const HaveCollectionText = styled.div`
    grid-area: CollectionText;
    font-size: 20pt;
    writing-mode: vertical-lr;
    padding-top: 25pt;
`;

// 宅配單號 BarCode
const OuterCodeBarCodeContainer = styled.div`
    grid-area: OuterCodeBarCode;
    display: flex;
    justify-content: center;
`;

// 配送聯
const DeliveryNoteInfoContainer = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 4fr 3fr 1fr 3fr 2fr;
    grid-template-areas:
        "Delivery_Info"
        "Delivery_Recipient"
        "Remark"
        "Delivery_Sender"
        "Delivery_Supplier";
`;

// 配送聯 - 配送資訊
const DeliveryInfoContainer = styled.div`
    grid-area: Delivery_Info;
    border: 1px solid black;
    display: grid;
    grid-template-columns: 0.8fr 0.8fr 1.4fr 1fr;
    grid-template-rows: 0.9fr 0.9fr repeat(2, 1.1fr);
    grid-template-areas:
        "PostalCode PostalCode ExpectArrivalDateColName TransportCode"
        "PostalCode PostalCode ExpectArrivalDate TransportCode"
        "OuterCodeRowName OuterCode OuterCode TransportCode"
        "TGCodeRowName TGCode TGCode TGCode";
`;

const PostalCode = styled.div`
    grid-area: PostalCode;
    border: 1px solid black;

    font-size: 20pt;
    font-weight: bolder;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ExpectArrivalDateColName = styled.div`
    grid-area: ExpectArrivalDateColName;
    border: 1px solid black;

    font-size: 10pt;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ExpectArrivalDate = styled.div`
    grid-area: ExpectArrivalDate;
    border: 1px solid black;

    font-size: 10pt;
    padding: 0 4pt;

    display: flex;
    align-items: center;
`;

const TransportCode = styled.div`
    grid-area: TransportCode;
    border: 1px solid black;

    font-size: 24pt;
    font-weight: bolder;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const OuterCodeRowName = styled.div`
    grid-area: OuterCodeRowName;
    border: 1px solid black;

    font-size: 10pt;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const OuterCode = styled.div`
    grid-area: OuterCode;
    border: 1px solid black;
    padding: 0 8px;

    font-size: 14pt;
    font-weight: bolder;

    display: flex;
    align-items: center;
`;

const TGCodeRowName = styled.div`
    grid-area: TGCodeRowName;
    border: 1px solid black;

    font-size: 10pt;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const TGCode = styled.div`
    grid-area: TGCode;
    border: 1px solid black;
    padding: 0 4px;

    font-size: 12pt;

    display: flex;
    align-items: center;
`;

// 配送聯 - 寄件人資訊
const DeliveryContactInfoContainer = styled.div`
    grid-area: ContactInfo;
    border: 1px solid black;
    border-right: none;

    font-size: 10pt;

    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template: "SenderContactInfo ForwarderPostalBarCode";
    align-items: center;
`;

const SenderContactInfo = styled.div`
    grid-area: SenderContactInfo;
    padding: 4px;
`;

// 配送聯 - 客戶代碼 BarCode
const DeliverySupplier = styled.div`
    grid-area: Delivery_Supplier;
    display: grid;
    grid-template-columns: 7fr 3fr;
    grid-template-areas: "SupplierCodeBarcode DeliveryContent";
`;

const SupplierCodeBarcode = styled.div`
    grid-area: SupplierCodeBarcode;
    align-self: center;
`;

const DeliveryContent = styled.div`
    grid-area: DeliveryContent;
    border: 1px solid black;
    border-top: none;
`;

// 收執聯
const ReceiptNoteInfoContainer = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 11fr 13fr 5fr 13fr 12fr 8fr;
    grid-template-areas:
        "Receipt_Info"
        "Receipt_Recipient"
        "Remark"
        "Receipt_Sender"
        "ReceiptSign"
        "ReceiptSupplier";
`;

// 收執聯 - 配送資訊
const ReceiptInfoContainer = styled.div`
    grid-area: Receipt_Info;
    border: 1px solid black;
    display: grid;
    grid-template-columns: 3fr 3fr 6fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
        "ReceiptOrderText OuterCodeRowName OuterCode"
        "ReceiptOrderText TGCodeRowName TGCode";
`;

const ReceiptOrderText = styled.div`
    grid-area: ReceiptOrderText;
    border: 1px solid black;

    font-size: 20px;
    font-weight: border;
    line-height: 22px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

// 收執聯 - 客戶代碼
const ReceiptSupplier = styled.div`
    grid-area: ReceiptSupplier;
    border: 1px solid black;

    display: grid;
    grid-template-columns: 6fr 1fr 3fr 4fr;
    grid-template-rows: auto;
    grid-template-areas: "CustomerNumber RowName ReceptQuantity Blank";
`;

const CustomerNumber = styled.div`
    grid-area: CustomerNumber;
    border: 1px solid black;

    font-size: 10pt;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReceptQuantity = styled.div`
    grid-area: ReceptQuantity;
    border: 1px solid black;

    font-size: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

// 收執聯 - 簽名
const ReceiptSignContainer = styled.div`
    grid-area: ReceiptSign;
    display: grid;
    border: 1px solid black;
    border-right: none;

    grid-template-columns: auto 3fr 3fr;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
        "SignInfo . ForwarderPostalBarCode"
        "ReceiptQuantity . ForwarderPostalBarCode";
`;

const SignInfo = styled.div`
    grid-area: SignInfo;
    border-right: 1px solid black;
    border-bottom: 1px solid black;

    padding: 4px;

    font-size: 10pt;

    align-self: start;
`;

const ReceiptQuantity = styled.div`
    grid-area: ReceiptQuantity;

    font-size: 10pt;
`;

const ForwarderPostalBarCode = styled.div`
    grid-area: ForwarderPostalBarCode;
    justify-self: end;
    align-self: center;
`;

// 欄位 - 收寄件人聯絡資訊 及 代收款
const ContactInfoAndCollectionContainer = styled.div<{ areaName: string }>`
    grid-area: ${(props) => props.areaName};
    display: grid;
    grid-template-columns: 1fr 10fr 1fr 4fr;
    grid-template-areas: "ContactInfoRowName ContactInfo CollectionRowName Collection";
`;

const VerticalTextRowName = styled.div<{
    areaName: string;
    fontSize?: PointUnit;
}>`
    grid-area: ${(props) => props.areaName};
    border: 1px solid black;

    font-size: ${(props) => props.fontSize || "12pt"};
    writing-mode: vertical-lr;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContactInfo = styled.div<{ fontSize?: PointUnit }>`
    grid-area: ContactInfo;
    border: 1px solid black;

    font-size: ${(props) => props.fontSize || "12pt"};

    padding: 4px;
`;

const DeliveryCollection = styled.div`
    grid-area: Collection;
    border: 1px solid black;

    display: flex;
    flex-direction: column;
`;

const CollectionCharge = styled.div`
    flex: 1 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const CollectionQuantity = styled.div`
    flex: 0 0 20px;

    padding: 0 4px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 欄位 - 收寄件人聯絡資訊
const ContactInfoContainer = styled.div<{ areaName: string }>`
    border: 1px solid black;
    grid-area: ${(props) => props.areaName};
    display: grid;
    grid-template-columns: 1fr 15fr;
    grid-template-areas: "ContactInfoRowName ContactInfo";
`;

// 欄位 - 備註
const RemarkContainer = styled.div`
    grid-area: Remark;
    border: 1px solid black;

    display: flex;
`;

const RemarkRowName = styled.div`
    border-right: 1px solid black;

    flex: 0 0 40px;

    font-size: 10pt;
    padding: 0 4px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Props {
    serverData: ECanConsignmentNoteReqModel[];
}

const ECanConsignmentNote: FC<Props> = ({ serverData }) => {
    const pdfData: ECanConsignmentNoteReqModel[][] = _.chunk(serverData, 3);

    return (
        <PaperLayout>
            {Array.isArray(pdfData) &&
                pdfData.map((pageData, pageIndex) => (
                    <PageContainer key={`page_${pageIndex}`}>
                        {pageData.map((noteData) => (
                            <ConsignmentNoteContainer key={noteData.OuterCode}>
                                {/* 文字：需冷凍 */}
                                <GridArea areaName="Blank"></GridArea>
                                {/*  配送聯 */}
                                <DeliveryNoteContainer areaName="DeliveryNote">
                                    <OuterCodeBarCodeContainer>
                                        <BarCode
                                            svgDOMElement={
                                                noteData.OuterCodeBarcode
                                            }
                                        />
                                    </OuterCodeBarCodeContainer>
                                    <PrintInfo>
                                        印單日/ {noteData.PrintDate}
                                    </PrintInfo>
                                    <GridArea areaName="Note_Info">
                                        <DeliveryNoteInfoContainer>
                                            {/* 配送資訊 */}
                                            <DeliveryInfoContainer>
                                                <PostalCode>
                                                    {
                                                        noteData.ForwarderPostalCode
                                                    }
                                                </PostalCode>
                                                <ExpectArrivalDateColName>
                                                    希望送達日
                                                </ExpectArrivalDateColName>
                                                <ExpectArrivalDate>
                                                    {
                                                        noteData.ExpectDeliveryArrivalDate
                                                    }
                                                </ExpectArrivalDate>
                                                <TransportCode>
                                                    {
                                                        noteData.ForwarderTransportCode
                                                    }
                                                </TransportCode>
                                                <OuterCodeRowName>
                                                    宅配單號
                                                </OuterCodeRowName>
                                                <OuterCode>
                                                    {noteData.OuterCode}
                                                </OuterCode>
                                                <TGCodeRowName>
                                                    客戶單號
                                                </TGCodeRowName>
                                                <TGCode>
                                                    {
                                                        noteData.TradesOrderGroupCode
                                                    }
                                                </TGCode>
                                            </DeliveryInfoContainer>
                                            {/* 收件人資訊 */}
                                            <ContactInfoAndCollectionContainer areaName="Delivery_Recipient">
                                                <VerticalTextRowName areaName="ContactInfoRowName">
                                                    收件人
                                                </VerticalTextRowName>
                                                <ContactInfo>
                                                    <p>
                                                        {
                                                            noteData.ReceiverAddress
                                                        }
                                                    </p>
                                                    <p>
                                                        {noteData.ReceiverName}
                                                    </p>
                                                </ContactInfo>
                                                <VerticalTextRowName areaName="CollectionRowName">
                                                    代收款
                                                </VerticalTextRowName>
                                                <DeliveryCollection>
                                                    <CollectionCharge>
                                                        {noteData.AgencyCharge}
                                                    </CollectionCharge>
                                                    <CollectionQuantity>
                                                        <span>件數</span>
                                                        <span>{`${noteData.Quantity}/${noteData.Quantity}`}</span>
                                                    </CollectionQuantity>
                                                </DeliveryCollection>
                                            </ContactInfoAndCollectionContainer>
                                            {/* 備註 */}
                                            <RemarkContainer>
                                                <RemarkRowName>
                                                    備註
                                                </RemarkRowName>
                                            </RemarkContainer>
                                            {/* 寄件人 */}
                                            <ContactInfoContainer
                                                areaName="Delivery_Sender"
                                                style={{
                                                    borderRight: "none",
                                                }}
                                            >
                                                <VerticalTextRowName areaName="ContactInfoRowName">
                                                    寄件人
                                                </VerticalTextRowName>
                                                <DeliveryContactInfoContainer>
                                                    <SenderContactInfo>
                                                        <p>
                                                            {
                                                                noteData.SenderName
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                noteData.SenderPhone
                                                            }
                                                        </p>
                                                        <p>
                                                            客戶代碼：
                                                            {
                                                                noteData.SupplierCode
                                                            }
                                                        </p>
                                                    </SenderContactInfo>
                                                    <ForwarderPostalBarCode>
                                                        <BarCode
                                                            svgDOMElement={
                                                                noteData.ForwarderPostalCodeBarcode
                                                            }
                                                        />
                                                    </ForwarderPostalBarCode>
                                                </DeliveryContactInfoContainer>
                                            </ContactInfoContainer>
                                            {/* 客戶代碼 */}
                                            <DeliverySupplier>
                                                <SupplierCodeBarcode>
                                                    <BarCode
                                                        svgDOMElement={
                                                            noteData.SupplierCodeBarcode
                                                        }
                                                    />
                                                </SupplierCodeBarcode>
                                                <DeliveryContent />
                                            </DeliverySupplier>
                                        </DeliveryNoteInfoContainer>
                                    </GridArea>
                                </DeliveryNoteContainer>
                                {/* 收執聯 */}
                                <DeliveryNoteContainer
                                    areaName="ReceiptNote"
                                    style={{ paddingLeft: "10mm" }}
                                >
                                    <OuterCodeBarCodeContainer>
                                        <BarCode
                                            svgDOMElement={
                                                noteData.OuterCodeBarcode
                                            }
                                        />
                                    </OuterCodeBarCodeContainer>
                                    <PrintInfo>
                                        <span style={{ paddingRight: "12pt" }}>
                                            印單日/ {noteData.PrintDate}
                                        </span>
                                        <span>
                                            希望送達日/{" "}
                                            {noteData.ExpectDeliveryArrivalDate}
                                        </span>
                                    </PrintInfo>
                                    <GridArea areaName="Note_Info">
                                        <ReceiptNoteInfoContainer>
                                            {/* 配送資訊 */}
                                            <ReceiptInfoContainer>
                                                <ReceiptOrderText>
                                                    配送所
                                                    <br />
                                                    收執聯
                                                </ReceiptOrderText>
                                                <OuterCodeRowName>
                                                    宅配單號
                                                </OuterCodeRowName>
                                                <OuterCode>
                                                    {noteData.OuterCode}
                                                </OuterCode>
                                                <TGCodeRowName>
                                                    客戶單號
                                                </TGCodeRowName>
                                                <TGCode>
                                                    {
                                                        noteData.TradesOrderGroupCode
                                                    }
                                                </TGCode>
                                            </ReceiptInfoContainer>
                                            {/* 收件人 */}
                                            <ContactInfoContainer areaName="Receipt_Recipient">
                                                <VerticalTextRowName areaName="ContactInfoRowName">
                                                    收件人
                                                </VerticalTextRowName>
                                                <ContactInfo>
                                                    <p>
                                                        {
                                                            noteData.ReceiverAddress
                                                        }
                                                    </p>
                                                    <p>
                                                        {noteData.ReceiverName}
                                                    </p>
                                                </ContactInfo>
                                            </ContactInfoContainer>
                                            {/* 備註 */}
                                            <RemarkContainer>
                                                <RemarkRowName>
                                                    備註
                                                </RemarkRowName>
                                            </RemarkContainer>
                                            {/* 寄件人 */}
                                            <ContactInfoAndCollectionContainer areaName="Receipt_Sender">
                                                <VerticalTextRowName areaName="ContactInfoRowName">
                                                    寄件人
                                                </VerticalTextRowName>
                                                <ContactInfo fontSize="10pt">
                                                    <p>{noteData.SenderName}</p>
                                                    <p>
                                                        {noteData.SenderPhone}
                                                    </p>
                                                </ContactInfo>
                                                <VerticalTextRowName areaName="CollectionRowName">
                                                    代收款
                                                </VerticalTextRowName>
                                                <DeliveryCollection>
                                                    <CollectionCharge>
                                                        {noteData.AgencyCharge}
                                                    </CollectionCharge>
                                                </DeliveryCollection>
                                            </ContactInfoAndCollectionContainer>
                                            <ReceiptSignContainer>
                                                <SignInfo>
                                                    收件人請簽全名
                                                </SignInfo>
                                                <ReceiptQuantity>
                                                    共簽收 {noteData.Quantity}{" "}
                                                    件
                                                </ReceiptQuantity>
                                                <ForwarderPostalBarCode>
                                                    <BarCode
                                                        svgDOMElement={
                                                            noteData.ForwarderPostalCodeBarcode
                                                        }
                                                    />
                                                </ForwarderPostalBarCode>
                                            </ReceiptSignContainer>
                                            {/* 客戶代碼 */}
                                            <ReceiptSupplier>
                                                <CustomerNumber>
                                                    客戶代碼：
                                                    {noteData.SupplierCode}
                                                </CustomerNumber>
                                                <VerticalTextRowName
                                                    areaName="RowName"
                                                    fontSize="9pt"
                                                >
                                                    件數
                                                </VerticalTextRowName>
                                                <ReceptQuantity>
                                                    {`${noteData.Quantity}/${noteData.Quantity}`}
                                                </ReceptQuantity>
                                                <GridArea
                                                    areaName="Blank"
                                                    border={true}
                                                />
                                            </ReceiptSupplier>
                                        </ReceiptNoteInfoContainer>
                                    </GridArea>
                                </DeliveryNoteContainer>
                                {/* 文字：有代收款 */}
                                <HaveCollectionText>
                                    有代收款
                                </HaveCollectionText>
                            </ConsignmentNoteContainer>
                        ))}
                    </PageContainer>
                ))}
        </PaperLayout>
    );
};

ECanConsignmentNote.defaultProps = {
    serverData: [],
};

export default ECanConsignmentNote;
