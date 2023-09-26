"use client"

import { useParams, useRouter } from "next/navigation"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { BillboardColumn, columns } from "./columns"

interface BillboardClientProps {
  data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="label" />
      <Heading title="Api List" description="API calls for Billboards" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  )
}
