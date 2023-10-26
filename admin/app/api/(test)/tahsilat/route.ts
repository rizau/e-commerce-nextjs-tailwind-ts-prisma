import { NextResponse } from "next/server"
import base64 from "base-64"
import * as xml2js from "xml2js"

const soapResponse1 = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<soap:Body>
		<BankPaymentListAllResponse
			xmlns="http://tempuri.org/">
			<BankPaymentListAllResult>
				<BankPaymentListItem>
					<PaymentID>28234367</PaymentID>
					<FirmBankCode>00015</FirmBankCode>
					<FirmBankName>VAKIFBANK</FirmBankName>
					<FirmBankIBAN>TR470001500158007301672932</FirmBankIBAN>
					<SenderFirmID>7512660</SenderFirmID>
					<SenderFirmCode>F1866</SenderFirmCode>
					<SenderFirmName>NATURAK TEST</SenderFirmName>
					<PaymentDate>2023-10-02T09:02:01</PaymentDate>
					<Amount>-35000.0000</Amount>
					<Explanation>S00524 No'lu Şube'nin 16221 No'lu Çeki'nin Takastan Ödenmesi Soran Banka: 10 Soran Şube: 2137  </Explanation>
					<PaymentTypeID>516</PaymentTypeID>
					<PaymentTypeExplantion>ÇEK</PaymentTypeExplantion>
					<PaymentStatusTypeID>531</PaymentStatusTypeID>
					<PaymentStatusTypeExplantion>EŞLEŞME YAPILDI</PaymentStatusTypeExplantion>
					<ReferenceNumber>2023009187520776</ReferenceNumber>
					<VoucherNumber>18577442319</VoucherNumber>
					<PaymentExpCode>PN866751266074</PaymentExpCode>
					<BranchFirmID>1282</BranchFirmID>
					<BranchFirmName>NATURAK GIDA PAZARLAMA SAN.VE TİC.A.Ş</BranchFirmName>
					<BranchFirmTaxNumber>6300434280</BranchFirmTaxNumber>
					<AccountTypeID>681</AccountTypeID>
					<AccountCurrencyCode>TRY</AccountCurrencyCode>
					<CheckNumber>0016221</CheckNumber>
					<FunctionCode1 />
					<FunctionCode2>CEKTTLPROV</FunctionCode2>
					<BalanceAfterTransaction>38766.3500</BalanceAfterTransaction>
				</BankPaymentListItem>
				<BankPaymentListItem>
					<PaymentID>28279451</PaymentID>
					<FirmBankCode>00010</FirmBankCode>
					<FirmBankName>ZİRAAT BANKASI</FirmBankName>
					<FirmBankIBAN>TR170001000791684324785019</FirmBankIBAN>
					<SenderFirmID>7512660</SenderFirmID>
					<SenderFirmCode>F1866</SenderFirmCode>
					<SenderFirmName>NATURAK TEST</SenderFirmName>
					<PaymentDate>2023-10-06T07:00:57</PaymentDate>
					<Amount>114000.0000</Amount>
					<Explanation>67,1270,0000000031255298 ait 6087048 no lu cek 68432478-5019 hs yatan Karşı Ünvan: BAYAR  </Explanation>
					<PaymentTypeID>516</PaymentTypeID>
					<PaymentTypeExplantion>ÇEK</PaymentTypeExplantion>
					<TCNumber>10880058886</TCNumber>
					<FullName>BAYAR</FullName>
					<PaymentStatusTypeID>531</PaymentStatusTypeID>
					<PaymentStatusTypeExplantion>EŞLEŞME YAPILDI</PaymentStatusTypeExplantion>
					<ReferenceNumber>20231006791Z02123</ReferenceNumber>
					<VoucherNumber>20231006791Z021232</VoucherNumber>
					<PaymentExpCode>PN866751266074</PaymentExpCode>
					<BranchFirmID>1282</BranchFirmID>
					<BranchFirmName>NATURAK GIDA PAZARLAMA SAN.VE TİC.A.Ş</BranchFirmName>
					<BranchFirmTaxNumber>6300434280</BranchFirmTaxNumber>
					<AccountTypeID>681</AccountTypeID>
					<AccountCurrencyCode>TRY</AccountCurrencyCode>
					<CheckNumber>6087048</CheckNumber>
					<FunctionCode1>CHK</FunctionCode1>
					<FunctionCode2>TAKCEKMU</FunctionCode2>
					<BalanceAfterTransaction>313002.5000</BalanceAfterTransaction>
				</BankPaymentListItem>
				<BankPaymentListItem>
					<PaymentID>28281771</PaymentID>
					<FirmBankCode>00010</FirmBankCode>
					<FirmBankName>ZİRAAT BANKASI</FirmBankName>
					<FirmBankIBAN>TR170001000791684324785019</FirmBankIBAN>
					<SenderFirmID>7512660</SenderFirmID>
					<SenderFirmCode>F1866</SenderFirmCode>
					<SenderFirmName>NATURAK TEST</SenderFirmName>
					<SenderFirmBankCode>00010</SenderFirmBankCode>
					<SenderFirmBankName>ZİRAAT BANKASI</SenderFirmBankName>
					<SenderFirmBankIBAN>TR280001000791684324785015</SenderFirmBankIBAN>
					<PaymentDate>2023-10-06T10:23:38</PaymentDate>
					<Amount>-113000.0000</Amount>
					<Explanation>68432478 5015 Teminat Bloke hesabından virman 113000 TRY Karşı Ünvan: NATURAK GIDA PAZARLAMA SANAYİ VE TİCARET ANONİM ŞİRKETİ  </Explanation>
					<PaymentTypeID>515</PaymentTypeID>
					<PaymentTypeExplantion>VİRMAN</PaymentTypeExplantion>
					<FullName>NATURAK GIDA PAZARLAMA SANAYİ VE TİCARET ANONİM ŞİRKETİ</FullName>
					<PaymentStatusTypeID>531</PaymentStatusTypeID>
					<PaymentStatusTypeExplantion>EŞLEŞME YAPILDI</PaymentStatusTypeExplantion>
					<ReferenceNumber>20231006791F01767</ReferenceNumber>
					<VoucherNumber>20231006791F017671</VoucherNumber>
					<TaxNumber>6300434280</TaxNumber>
					<PaymentExpCode>PN866751266074</PaymentExpCode>
					<BranchFirmID>1282</BranchFirmID>
					<BranchFirmName>NATURAK GIDA PAZARLAMA SAN.VE TİC.A.Ş</BranchFirmName>
					<BranchFirmTaxNumber>6300434280</BranchFirmTaxNumber>
					<AccountTypeID>681</AccountTypeID>
					<AccountCurrencyCode>TRY</AccountCurrencyCode>
					<FunctionCode1>XXX</FunctionCode1>
					<FunctionCode2>KKRTTNBV</FunctionCode2>
					<BalanceAfterTransaction>200002.5000</BalanceAfterTransaction>
				</BankPaymentListItem>
				<BankPaymentListItem>
					<PaymentID>28234254</PaymentID>
					<FirmBankCode>00015</FirmBankCode>
					<FirmBankName>VAKIFBANK</FirmBankName>
					<FirmBankIBAN>TR470001500158007301672932</FirmBankIBAN>
					<SenderFirmID>7512660</SenderFirmID>
					<SenderFirmCode>F1866</SenderFirmCode>
					<SenderFirmName>NATURAK TEST</SenderFirmName>
					<PaymentDate>2023-09-28T15:30:50</PaymentDate>
					<Amount>-1000000.0000</Amount>
					<Explanation>S00524 No'lu Şube'nin 16985 No'lu Çeki'nin Takastan Ödenmesi Soran Banka: 111 Soran Şube: 1401  </Explanation>
					<PaymentTypeID>516</PaymentTypeID>
					<PaymentTypeExplantion>ÇEK</PaymentTypeExplantion>
					<PaymentStatusTypeID>531</PaymentStatusTypeID>
					<PaymentStatusTypeExplantion>EŞLEŞME YAPILDI</PaymentStatusTypeExplantion>
					<ReferenceNumber>2023009065714247</ReferenceNumber>
					<VoucherNumber>18543577475</VoucherNumber>
					<PaymentExpCode>PN866751266074</PaymentExpCode>
					<BranchFirmID>1282</BranchFirmID>
					<BranchFirmName>NATURAK GIDA PAZARLAMA SAN.VE TİC.A.Ş</BranchFirmName>
					<BranchFirmTaxNumber>6300434280</BranchFirmTaxNumber>
					<AccountTypeID>681</AccountTypeID>
					<AccountCurrencyCode>TRY</AccountCurrencyCode>
					<CheckNumber>0016985</CheckNumber>
					<FunctionCode1 />
					<FunctionCode2>CEKTTLPROV</FunctionCode2>
					<BalanceAfterTransaction>156487.0000</BalanceAfterTransaction>
				</BankPaymentListItem>
				<BankPaymentListItem>
					<PaymentID>28234099</PaymentID>
					<FirmBankCode>00010</FirmBankCode>
					<FirmBankName>ZİRAAT BANKASI</FirmBankName>
					<FirmBankIBAN>TR170001000791684324785019</FirmBankIBAN>
					<SenderFirmID>7512660</SenderFirmID>
					<SenderFirmCode>F1866</SenderFirmCode>
					<SenderFirmName>NATURAK TEST</SenderFirmName>
					<SenderFirmBankCode>00010</SenderFirmBankCode>
					<SenderFirmBankName>ZİRAAT BANKASI</SenderFirmBankName>
					<SenderFirmBankIBAN>TR280001000791684324785015</SenderFirmBankIBAN>
					<PaymentDate>2023-09-27T09:37:33</PaymentDate>
					<Amount>-155500.0000</Amount>
					<Explanation>68432478 5015 Teminat Bloke hesabından virman 155500 TRY Karşı Ünvan: NATURAK GIDA PAZARLAMA SANAYİ VE TİCARET ANONİM ŞİRKETİ  </Explanation>
					<PaymentTypeID>515</PaymentTypeID>
					<PaymentTypeExplantion>VİRMAN</PaymentTypeExplantion>
					<FullName>NATURAK GIDA PAZARLAMA SANAYİ VE TİCARET ANONİM ŞİRKETİ</FullName>
					<PaymentStatusTypeID>531</PaymentStatusTypeID>
					<PaymentStatusTypeExplantion>EŞLEŞME YAPILDI</PaymentStatusTypeExplantion>
					<ReferenceNumber>20230927791F01298</ReferenceNumber>
					<VoucherNumber>20230927791F012981</VoucherNumber>
					<TaxNumber>6300434280</TaxNumber>
					<PaymentExpCode>PN866751266074</PaymentExpCode>
					<BranchFirmID>1282</BranchFirmID>
					<BranchFirmName>NATURAK GIDA PAZARLAMA SAN.VE TİC.A.Ş</BranchFirmName>
					<BranchFirmTaxNumber>6300434280</BranchFirmTaxNumber>
					<AccountTypeID>681</AccountTypeID>
					<AccountCurrencyCode>TRY</AccountCurrencyCode>
					<FunctionCode1>XXX</FunctionCode1>
					<FunctionCode2>KKRTTNBV</FunctionCode2>
					<BalanceAfterTransaction>2.5000</BalanceAfterTransaction>
				</BankPaymentListItem>
				<BankPaymentListItem>
					<PaymentID>28234125</PaymentID>
					<FirmBankCode>00015</FirmBankCode>
					<FirmBankName>VAKIFBANK</FirmBankName>
					<FirmBankIBAN>TR470001500158007301672932</FirmBankIBAN>
					<SenderFirmID>7512660</SenderFirmID>
					<SenderFirmCode>F1866</SenderFirmCode>
					<SenderFirmName>NATURAK TEST</SenderFirmName>
					<PaymentDate>2023-09-25T15:01:13</PaymentDate>
					<Amount>-750000.0000</Amount>
					<Explanation>Çekin otomatik provizyon ile tahsili  Çek Şubesi: 524 Çek No: 16217 Çek Tipi: Teminat Bordro No: 13291516  </Explanation>
					<PaymentTypeID>516</PaymentTypeID>
					<PaymentTypeExplantion>ÇEK</PaymentTypeExplantion>
					<PaymentStatusTypeID>531</PaymentStatusTypeID>
					<PaymentStatusTypeExplantion>EŞLEŞME YAPILDI</PaymentStatusTypeExplantion>
					<ReferenceNumber>2023008950968559</ReferenceNumber>
					<VoucherNumber>18513014667</VoucherNumber>
					<PaymentExpCode>PN866751266074</PaymentExpCode>
					<BranchFirmID>1282</BranchFirmID>
					<BranchFirmName>NATURAK GIDA PAZARLAMA SAN.VE TİC.A.Ş</BranchFirmName>
					<BranchFirmTaxNumber>6300434280</BranchFirmTaxNumber>
					<AccountTypeID>681</AccountTypeID>
					<AccountCurrencyCode>TRY</AccountCurrencyCode>
					<CheckNumber>0016217</CheckNumber>
					<FunctionCode1 />
					<FunctionCode2>CEKTILRPRV</FunctionCode2>
					<BalanceAfterTransaction>33840.7500</BalanceAfterTransaction>
				</BankPaymentListItem>
			<BankPaymentListItem>
				<PaymentID>28234121</PaymentID>
				<FirmBankCode>00015</FirmBankCode>
				<FirmBankName>VAKIFBANK</FirmBankName>
				<FirmBankIBAN>TR470001500158007301672932</FirmBankIBAN>
				<SenderFirmID>7512660</SenderFirmID>
				<SenderFirmCode>F1866</SenderFirmCode>
				<SenderFirmName>NATURAK TEST</SenderFirmName>
				<PaymentDate>2023-09-25T15:00:50</PaymentDate>
				<Amount>-750000.0000</Amount>
				<Explanation>S00524 No'lu Şube'nin 16215 No'lu Çeki'nin Takastan Ödenmesi Soran Banka: 32 Soran Şube: 12  </Explanation>
				<PaymentTypeID>516</PaymentTypeID>
				<PaymentTypeExplantion>ÇEK</PaymentTypeExplantion>
				<PaymentStatusTypeID>531</PaymentStatusTypeID>
				<PaymentStatusTypeExplantion>EŞLEŞME YAPILDI</PaymentStatusTypeExplantion>
				<ReferenceNumber>2023008950959169</ReferenceNumber>
				<VoucherNumber>18513013742</VoucherNumber>
				<PaymentExpCode>PN866751266074</PaymentExpCode>
				<BranchFirmID>1282</BranchFirmID>
				<BranchFirmName>NATURAK GIDA PAZARLAMA SAN.VE TİC.A.Ş</BranchFirmName>
				<BranchFirmTaxNumber>6300434280</BranchFirmTaxNumber>
				<AccountTypeID>681</AccountTypeID>
				<AccountCurrencyCode>TRY</AccountCurrencyCode>
				<CheckNumber>0016215</CheckNumber>
				<FunctionCode1 />
				<FunctionCode2>CEKTTLPROV</FunctionCode2>
				<BalanceAfterTransaction>3033840.7500</BalanceAfterTransaction>
			</BankPaymentListItem>
		</BankPaymentListAllResult>
	</BankPaymentListAllResponse>
</soap:Body>undefined</soap:Envelope>`

const soapResponse2 = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <BankPaymentListAllResponse xmlns="http://tempuri.org/">
      <BankPaymentListAllResult>
        <BankPaymentListItem>
          <PaymentID>int</PaymentID>
          <FirmBankCode>string</FirmBankCode>
          <FirmBankName>string</FirmBankName>
          <FirmBankIBAN>string</FirmBankIBAN>
          <SenderFirmID>int</SenderFirmID>
          <SenderFirmCode>string</SenderFirmCode>
          <SenderFirmName>string</SenderFirmName>
          <SenderFirmBankCode>string</SenderFirmBankCode>
          <SenderFirmBankName>string</SenderFirmBankName>
          <SenderFirmBankIBAN>string</SenderFirmBankIBAN>
          <PaymentDate>dateTime</PaymentDate>
          <Amount>decimal</Amount>
          <Explanation>string</Explanation>
          <PaymentTypeID>int</PaymentTypeID>
          <PaymentTypeExplantion>string</PaymentTypeExplantion>
          <TCNumber>string</TCNumber>
          <FullName>string</FullName>
          <PaymentStatusTypeID>int</PaymentStatusTypeID>
          <PaymentStatusTypeExplantion>string</PaymentStatusTypeExplantion>
          <ReferenceNumber>string</ReferenceNumber>
          <VoucherNumber>string</VoucherNumber>
          <TaxNumber>string</TaxNumber>
          <PaymentExpCode>string</PaymentExpCode>
          <BranchFirmID>int</BranchFirmID>
          <BranchFirmName>string</BranchFirmName>
          <BranchFirmTaxNumber>string</BranchFirmTaxNumber>
          <AccountTypeID>int</AccountTypeID>
          <AccountCurrencyCode>string</AccountCurrencyCode>
          <AccountRelationCode>string</AccountRelationCode>
          <SenderFirmBusinessArea>string</SenderFirmBusinessArea>
          <SenderFirmAccountingCode>string</SenderFirmAccountingCode>
          <SenderFirmReservedField>string</SenderFirmReservedField>
          <CheckNumber>string</CheckNumber>
          <CustomField1>string</CustomField1>
          <CustomField2>string</CustomField2>
          <FunctionCode1>string</FunctionCode1>
          <FunctionCode2>string</FunctionCode2>
          <BalanceAfterTransaction>decimal</BalanceAfterTransaction>
        </BankPaymentListItem>
        <BankPaymentListItem>
          <PaymentID>int</PaymentID>
          <FirmBankCode>string</FirmBankCode>
          <FirmBankName>string</FirmBankName>
          <FirmBankIBAN>string</FirmBankIBAN>
          <SenderFirmID>int</SenderFirmID>
          <SenderFirmCode>string</SenderFirmCode>
          <SenderFirmName>string</SenderFirmName>
          <SenderFirmBankCode>string</SenderFirmBankCode>
          <SenderFirmBankName>string</SenderFirmBankName>
          <SenderFirmBankIBAN>string</SenderFirmBankIBAN>
          <PaymentDate>dateTime</PaymentDate>
          <Amount>decimal</Amount>
          <Explanation>string</Explanation>
          <PaymentTypeID>int</PaymentTypeID>
          <PaymentTypeExplantion>string</PaymentTypeExplantion>
          <TCNumber>string</TCNumber>
          <FullName>string</FullName>
          <PaymentStatusTypeID>int</PaymentStatusTypeID>
          <PaymentStatusTypeExplantion>string</PaymentStatusTypeExplantion>
          <ReferenceNumber>string</ReferenceNumber>
          <VoucherNumber>string</VoucherNumber>
          <TaxNumber>string</TaxNumber>
          <PaymentExpCode>string</PaymentExpCode>
          <BranchFirmID>int</BranchFirmID>
          <BranchFirmName>string</BranchFirmName>
          <BranchFirmTaxNumber>string</BranchFirmTaxNumber>
          <AccountTypeID>int</AccountTypeID>
          <AccountCurrencyCode>string</AccountCurrencyCode>
          <AccountRelationCode>string</AccountRelationCode>
          <SenderFirmBusinessArea>string</SenderFirmBusinessArea>
          <SenderFirmAccountingCode>string</SenderFirmAccountingCode>
          <SenderFirmReservedField>string</SenderFirmReservedField>
          <CheckNumber>string</CheckNumber>
          <CustomField1>string</CustomField1>
          <CustomField2>string</CustomField2>
          <FunctionCode1>string</FunctionCode1>
          <FunctionCode2>string</FunctionCode2>
          <BalanceAfterTransaction>decimal</BalanceAfterTransaction>
        </BankPaymentListItem>
      </BankPaymentListAllResult>
    </BankPaymentListAllResponse>
  </soap:Body>
</soap:Envelope>`
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json()
    const { test } = body

    const parseOptions: xml2js.Options = {
      explicitArray: false, // Set to false to avoid wrapping arrays when there is only one item
      ignoreAttrs: true, // Ignore XML attributes
    }

    let convertedResult
    if (test) {
      const xml = soapResponse1
      const xmlParser = new xml2js.Parser(parseOptions)
      xmlParser.parseString(xml, (error: Error | null, result: any) => {
        if (error) {
          console.error("Error parsing XML" + error)
          return null
        } else {
          convertedResult =
            result["soap:Envelope"]["soap:Body"].BankPaymentListAllResponse
        }
      })
      return NextResponse.json({ data: convertedResult })
    }
    const username = "ENTGF1866"
    const password = "549@Fdk3TA3+pyF"

    const soapRequest = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
  <BankPaymentListAll xmlns="http://tempuri.org/">
    <userName>ENTGF1866</userName>
    <password>549@Fdk3TA3+pyF</password>
    <firmCode>6E24B60C43374BA5AAAD0B0790966E43</firmCode>
    <paymentStatusTypeID>531</paymentStatusTypeID>
    <startDate>2023-01-01</startDate>
    <endDate>2023-12-31</endDate>
  </BankPaymentListAll>
</soap:Body>
</soap:Envelope>`

    const url =
      "https://test.buluttahsilat.com/WebService/WSBankPaymentService.asmx"
    const response = await fetch(url, {
      method: "POST",
      body: soapRequest,
      headers: {
        Authorization: "Basic " + base64.encode(username + ":" + password),
        "Content-Type": "text/xml",
      },
    })
    //console.log("response", response)
    const data = await response.text()
    //console.log("data", data)

    const xml = data
    const xmlParser = new xml2js.Parser(parseOptions)
    xmlParser.parseString(xml, (error: Error | null, result: any) => {
      if (error) {
        console.error("Error parsing XML" + error)
        return null
      } else {
        convertedResult =
          result["soap:Envelope"]["soap:Body"].BankPaymentListAllResponse
      }
    })
    return NextResponse.json({ data: convertedResult })
  } catch (error) {
    console.log("[TAHSILAT_POST", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
