import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";

export const EditInput = ({
  type = "text",
  placeholder = "",
  autoComplete = "on",
  className,
  name,
  defaultValue = "",
  required,
  message,
  regValue,
  minLength,
  minMessage,
  maxMessage,
  maxLength,
  errors,
  register,
}) => {
  // Register the input and set defaultValue
  useEffect(() => {
    register(name, {
      required: required,
      pattern: {
        value: new RegExp(regValue),
        message: message,
      },
      minLength: {
        value: minLength,
        message: minMessage,
      },
      maxLength: {
        value: maxLength,
        message: maxMessage,
      },
    });
  }, [
    register,
    name,
    required,
    regValue,
    message,
    minLength,
    minMessage,
    maxLength,
    maxMessage,
  ]);

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${className} w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent ${
          errors[name] ? "focus:ring-red-500 border-red-500" : ""
        }`}
        defaultValue={defaultValue}
        {...register(name)}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) =>
          message && (
            <p className="text-[12px] text-red-500 pt-[0.3rem] pl-[0.5rem]">
              {message}
            </p>
          )
        }
      />
    </div>
  );
};
