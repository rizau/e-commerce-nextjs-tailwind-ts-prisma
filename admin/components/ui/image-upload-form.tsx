import React, { ChangeEvent, useState } from "react"
import { ImagePlus } from "lucide-react"

import { Button } from "./button"
import { Input } from "./input"

interface PrivatePageProps {
  onChange: (value: string) => void
  onImageUpload: (url: string) => void
}

export default function ImageUploadForm(props: PrivatePageProps): JSX.Element {
  const [image, setImage] = useState<File | null>(null)
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null)

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]

      setImage(i)
      setCreateObjectURL(URL.createObjectURL(i))
      //console.log(i)
      props.onChange("/uploads/" + i.name)
    }
  }

  const uploadToServer = async () => {
    if (image) {
      const body = new FormData()
      body.append("file", image)

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body,
        })

        const data = await response.json()

        props.onImageUpload(data.url)
      } catch (error) {
        // Handle errors here
      }
    }
  }

  return (
    <div>
      <div>
        {createObjectURL && (
          <div className="relative w-[200px] h-[200px]">
            <img src={createObjectURL} alt="Uploaded" />
          </div>
        )}

        <Input type="file" name="myImage" onChange={uploadToClient} />
        <Button
          className="btn btn-primary"
          type="button" // Changed from "submit" to "button"
          onClick={uploadToServer}
        >
          <ImagePlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
