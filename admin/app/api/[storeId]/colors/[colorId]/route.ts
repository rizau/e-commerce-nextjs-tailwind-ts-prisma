import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!params.colorId)
      return new NextResponse("color id is required", { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    })
    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

    const color = await prismadb.color.findUnique({
      where: { id: params.colorId },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[color_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const { value, name } = body
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
    if (!name) return new NextResponse("Name is required ", { status: 400 })
    if (!value) return new NextResponse("Value is required ", { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    })
    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

    const color = await prismadb.color.updateMany({
      where: { id: params.colorId, storeId: params.storeId },
      data: { value, name },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[color_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!params.colorId)
      return new NextResponse("color id is required", { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    })
    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

    const color = await prismadb.color.deleteMany({
      where: { id: params.colorId },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[color_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
