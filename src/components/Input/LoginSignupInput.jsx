import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export const LoginSignupInput = ({
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
  icon,
  register,
  sufix,
  handlePasswordToggle,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = (e) => {
    const inputChangeValue = e.target.value;
    setInputValue(inputChangeValue);
  };

  const hasError = errors[name];

  return (
    <>
      <div
        className={`border px-2 py-2 border-gray-300 shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center text-[14px] ${
          hasError
            ? "focus-within:ring-red-500 focus-within:border-red-500 border-red-500"
            : ""
        }`}
      >
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${className} block w-full focus:outline-none `}
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
        {sufix && (
          <button type="button" onClick={handlePasswordToggle}>
            {sufix}
          </button>
        )}
      </div>

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
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ minMessage }) =>
          minMessage && (
            <p
              className="text-[12px] text-red-500 pt-[0.3rem] pl-[0.5rem]"
              key={type}
            >
              {minMessage}
            </p>
          )
        }
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ maxMessage }) =>
          maxMessage && (
            <p
              className="text-[12px] text-red-500 pt-[0.3rem] pl-[0.5rem]"
              key={type}
            >
              {maxMessage}
            </p>
          )
        }
      />
    </>
  );
};
