"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

import ImageUploadForm from "./image-upload-form"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  onUpload: (url: string) => void

  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  onUpload,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  // const [isLoaded, SetIsLoaded] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onImageChange = (url: string) => {
    onChange(url)
    // SetIsLoaded(false)
  }

  const onImageUploadHandler = (url: string) => {
    onUpload(url)
  }

  if (!isMounted) return null
  //console.log(value)
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                //disabled={disabled}
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" src={url} alt={url} />
          </div>
        ))}
      </div>
      <ImageUploadForm
        onChange={onImageChange}
        onImageUpload={onImageUploadHandler}
      />
    </div>
  )
}

export default ImageUpload
