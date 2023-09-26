"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { useOrigin } from "@/hooks/use-origin"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { label: "", imageUrl: "" },
  })
  const origin = useOrigin()
  const params = useParams()
  const router = useRouter()

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      console.log("submit billboard")
      setLoading(true)
      let response
      if (initialData) {
        response = await fetch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          {
            method: "PATCH",
            body: JSON.stringify(data),
          }
        )
      } else {
        response = await fetch(`/api/${params.storeId}/billboards`, {
          method: "POST",
          body: JSON.stringify(data),
        })
      }

      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success("Updated successfuly")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = () => {
    try {
      setLoading(true)
      fetch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
        method: "DELETE",
      }).then((_res) => {
        router.refresh()
        router.push("/")
        toast.success("Billboard deleted.")
      })
    } catch (error) {
      toast.error(
        "There are many records about this billboard, first delete them"
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const title = initialData ? "Update billboard" : "Create billboard"
  const description = initialData ? "Update a billboard" : "Add a billboard"
  const actionButtonName = initialData ? "Save Changes" : "Create Billboard"

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(true)
            }}
          >
            <Trash className="h-4 w-4 mr-2" /> Delete Billboard
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            {" "}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      onChange={(url) => {
                        field.onChange(url)
                        setLoading(true)
                      }}
                      onUpload={(url) => setLoading(false)}
                      onRemove={() => field.onChange("")}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {actionButtonName}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  )
}
