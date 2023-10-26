"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"

export default function TahsilatPage() {
  const [items, setItems] = useState([])
  const testClickHandler = async () => {
    try {
      const response = await fetch("/api/tahsilat", {
        body: JSON.stringify({ test: true }),
        method: "POST",
      })

      const data = await response.json()
      setItems(data.data.BankPaymentListAllResult.BankPaymentListItem)
      //console.log(data.BankPaymentListAllResult.BankPaymentListItem)
    } catch (error) {}
  }
  return (
    <>
      <div className="flex items-center justify-around">
        <Heading
          title="Banka hareketleri"
          description="Tahsilat ve Ödeme Kayıtları"
        />
        <Button onClick={testClickHandler}>Sorgula</Button>
      </div>
      <Separator />
      <DataTable data={items} columns={columns} searchKey="Explanation" />
    </>
  )
}
