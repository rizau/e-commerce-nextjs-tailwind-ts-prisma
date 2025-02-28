"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Size, Store } from "@prisma/client"
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
  value: z.string().min(1),
  name: z.string().min(1),
})

type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
  initialData: Size | null
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { value: "", name: "" },
  })
  const origin = useOrigin()
  const params = useParams()
  const router = useRouter()

  const onSubmit = async (data: SizeFormValues) => {
    try {
      console.log("submit size")
      setLoading(true)
      let response
      if (initialData) {
        response = await fetch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          {
            method: "PATCH",
            body: JSON.stringify(data),
          }
        )
      } else {
        response = await fetch(`/api/${params.storeId}/sizes`, {
          method: "POST",
          body: JSON.stringify(data),
        })
      }

      router.refresh()
      router.push(`/${params.storeId}/sizes`)
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
      fetch(`/api/${params.storeId}/sizes/${params.sizeId}`, {
        method: "DELETE",
      }).then((_res) => {
        router.refresh()
        router.push(`/${params.storeId}/sizes`)
        toast.success("Size deleted.")
      })
    } catch (error) {
      toast.error("There are many records about this sizes, first delete them")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const title = initialData ? "Update size" : "Create size"
  const description = initialData ? "Update a size" : "Add a size"
  const actionButtonName = initialData ? "Save Changes" : "Create size"

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
            <Trash className="h-4 w-4 mr-2" /> Delete Size
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size Value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
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
