import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!params.productId)
      return new NextResponse("product id is required", { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    })
    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

    const product = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: { images: true, category: true, size: true, color: true },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[product_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      isArchived,
      isFeatured,
      images,
    } = body
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })
    if (!name) return new NextResponse("Name is required ", { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    })
    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

    await prismadb.product.update({
      where: { id: params.productId, storeId: params.storeId },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isArchived,
        isFeatured,
        images: { deleteMany: {} },
      },
    })
    const product = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log("[product_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

    if (!params.productId)
      return new NextResponse("product id is required", { status: 400 })

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    })
    if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

    const product = await prismadb.product.deleteMany({
      where: { id: params.productId },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[product_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
