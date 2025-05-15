import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router'
import { useAuth } from "../hooks/useAuth"
import InputField from "./InputField"

const schema = z.object({
  title: z.string().min(2, "Brand must contain at least two letters").max(20, "Brand cannot exceed 20 characters"),
  description: z.string(),
})

type StreamSchema = z.infer<typeof schema>

const StreamForm = () => {
  const navigate = useNavigate()
  const { jwt } = useAuth()
  console.log("JWT: ", jwt)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<StreamSchema>({
    resolver: zodResolver(schema)
  })

  const formArray = [
    {
      name: "title",
      type: "text",
      error: errors.title
    },
    {
      name: "description",
      type: "textarea",
      error: errors.description
    },
  ]

  const onSubmit = async (data: StreamSchema) => {
    const formData = new FormData();
    formArray.forEach((field) => {
      const key = field.name as keyof StreamSchema
      formData.append(field.name, data[key])
    })

    const result = await fetch(
      `${import.meta.env.VITE_API_URL}/streams`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    )
    const json = await result.json()
    if(result.ok) {
      navigate("/streams")
    } else if (json.detail) {
      // setMessage(JSON.stringify(json))
      navigate("/")
    }
  }

  return(
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center text-2xl font-bold mb-6">Insert new Stream</h2>
            {formArray.map((item, index) => {
              const { name, ...rest } = register(item.name as keyof StreamSchema)
              return (
                <InputField
                  key={index}
                  name={name}
                  type={item.type}
                  error={item.error}
                  {...rest}
                />
              )
            })}
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save new stream"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
  
}

export default StreamForm