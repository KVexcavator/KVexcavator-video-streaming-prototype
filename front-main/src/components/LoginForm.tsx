import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"

const schema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters long").max(10, "Username cannot exceed 10 characters"),
  password: z.string().min(4, "Password must be at least 4 characters long").max(10, "Password cannot exceed 10 characters"),
})

type LoginSchema = z.infer<typeof schema>

const LoginForm = () => {
  const { login, message } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({ resolver: zodResolver(schema) })

  const onSubmitForm = async (data: LoginSchema) => {
    setLoading(true)
    await login(data.username, data.password)
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              {...register("password")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {message && (
            <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
