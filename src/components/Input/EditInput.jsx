import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export const EditInput = ({
  type = "text",
  placeholder = "",
  autoComplete = "on",
  className,
  name,
  defaultValue,
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
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = (e) => {
    const inputChangeValue = e.target.value;
    setInputValue(inputChangeValue);
  };

  const hasError = errors[name];

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${className} w-full p-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent ${
          hasError ? "focus:ring-red-500 border-red-500" : ""
        }`}
        {...register(name, {
          value: inputValue,
          onChange: handleChange,
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
        })}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) =>
          message && (
            <p
              className="text-[12px] text-red-500 pt-[0.3rem] pl-[0.5rem]"
              key={type}
            >
              {message}
            </p>
          )
        }
      />
    </div>
  );
};
