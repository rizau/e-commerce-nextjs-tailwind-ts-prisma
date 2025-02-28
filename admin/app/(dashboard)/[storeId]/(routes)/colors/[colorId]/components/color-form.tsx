"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
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
  value: z
    .string()
    .min(4)
    .regex(/^#/, { message: "string must be a valid hex code" }),
  name: z.string().min(1),
})

type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
  initialData: Color | null
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { value: "", name: "" },
  })
  const origin = useOrigin()
  const params = useParams()
  const router = useRouter()

  const onSubmit = async (data: ColorFormValues) => {
    try {
      console.log("submit color")
      setLoading(true)
      let response
      if (initialData) {
        response = await fetch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          {
            method: "PATCH",
            body: JSON.stringify(data),
          }
        )
      } else {
        response = await fetch(`/api/${params.storeId}/colors`, {
          method: "POST",
          body: JSON.stringify(data),
        })
      }

      router.refresh()
      router.push(`/${params.storeId}/colors`)
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
      fetch(`/api/${params.storeId}/colors/${params.colorId}`, {
        method: "DELETE",
      }).then((_res) => {
        router.refresh()
        router.push(`/${params.storeId}/colors`)
        toast.success("Color deleted.")
      })
    } catch (error) {
      toast.error("There are many records about this colors, first delete them")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const title = initialData ? "Update color" : "Create color"
  const description = initialData ? "Update a color" : "Add a color"
  const actionButtonName = initialData ? "Save Changes" : "Create color"

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
            color="sm"
            onClick={() => {
              setOpen(true)
            }}
          >
            <Trash className="h-4 w-4 mr-2" /> Delete color
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="color Value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      ></div>
                    </div>
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
                      placeholder="color name"
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
