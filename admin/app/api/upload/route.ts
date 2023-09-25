import { writeFile } from "fs/promises"
import { join } from "path"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const file: File | null = data.get("file") as unknown as File

  if (!file) return new Response("No file", { status: 500 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join("./public", "uploads", file.name)
  await writeFile(path, buffer)

  return Response.json({ success: true, path })
}
