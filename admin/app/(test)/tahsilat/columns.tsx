"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BankPaymentListItem = {
  PaymentID: number
  FirmBankCode: string
  FirmBankName: string
  FirmBankIBAN: string
  SenderFirmID: number
  SenderFirmCode: string
  SenderFirmName: string
  SenderFirmBankCode: string
  SenderFirmBankName: string
  SenderFirmBankIBAN: string
  PaymentDate: Date
  Amount: number
  Explanation: string
  PaymentTypeID: number
  PaymentTypeExplantion: string
  TCNumber: string
  FullName: string
  PaymentStatusTypeID: number
  PaymentStatusTypeExplantion: string
  ReferenceNumber: string
  VoucherNumber: string
  TaxNumber: string
  PaymentExpCode: string
  BranchFirmID: number
  BranchFirmName: string
  BranchFirmTaxNumber: string
  AccountTypeID: number
  AccountCurrencyCode: string
  AccountRelationCode: string
  SenderFirmBusinessArea: string
  SenderFirmAccountingCode: string
  SenderFirmReservedField: string
  CheckNumber: string
  CustomField1: string
  CustomField2: string
  FunctionCode1: string
  FunctionCode2: string
  BalanceAfterTransaction: number
}

type BankPaymentListItemColumn = BankPaymentListItem

export const columns: ColumnDef<BankPaymentListItemColumn>[] = [
  {
    accessorKey: "FirmBankCode",
    header: "FirmBankCode",
  },
  {
    accessorKey: "FirmBankName",
    header: "FirmBankName",
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  {
    accessorKey: "Explanation",
    header: "Explanation",
  },
  {
    accessorKey: "PaymentTypeExplantion",
    header: "PaymentTypeExplantion",
  },
  {
    accessorKey: "CheckNumber",
    header: "CheckNumber",
  },
  {
    accessorKey: "SenderFirmCode",
    header: "SenderFirmCode",
  },
  {
    accessorKey: "SenderFirmName",
    header: "SenderFirmName",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
