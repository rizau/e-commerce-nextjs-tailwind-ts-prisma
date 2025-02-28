import { format, lightFormat } from "date-fns"

import prismadb from "@/lib/prismadb"

import { SizeClient } from "./components/client"
import { SizeColumn } from "./components/columns"

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  })

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    //  createdAt: billboard.createdAt.toLocaleDateString(),
    createdAt: lightFormat(size.createdAt, "dd.MM.yyyy"),
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  )
}

export default SizesPage
