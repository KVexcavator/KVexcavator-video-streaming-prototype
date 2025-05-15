import { type FieldError } from "react-hook-form"

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string
  type: string
  error?: FieldError
}

const InputField = ({ name, type, error, ...rest }: InputFieldProps) => {
  const label = name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm mb-2"
        htmlFor={name}
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px] resize-y"
          id={name}
          name={name}
          placeholder={label}
          required
          autoComplete="off"
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          name={name}
          type={type}
          placeholder={label}
          required
          autoComplete="off"
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error.message}</p>
      )}
    </div>
  )
}

export default InputField
