import { ChangeEvent, FC } from "react";
import { IFormGroupProps } from "../types";

export const FormGroup: FC<IFormGroupProps> = ({
  type,
  className,
  value,
  id,
  prependIcon,
  prependIconContainerClass,
  onPrependClicked,
  appendIcon,
  appendIconContainerClass,
  onAppendClicked,
  label,
  placeholder,
  disabled,
  readOnly,
  passValidation,
  failedValidation,
  onValueChanged,
  onFocusOut,
}) => {

  return (
    <div className="flex flex-col box-border w-full p-0 font-medium text-xs">
      {label && (
        <label htmlFor={id} className="w-full text-gray-900 p-0 mb-1">
          {label}
        </label>
      )}

      <div
        className={`flex flex-row items-center justify-center ${
          disabled && "bg-gray-100"
        } rounded-lg relative`}
      >
        {prependIcon && (
          <span
            className={`absolute left-0 rounded-l-lg flex items-center justify-center w-12 h-full p-4 ${prependIconContainerClass}`}
            onClick={onPrependClicked}
          >
            {prependIcon}
          </span>
        )}
        <input
          id={id}
          className={`border outline-none border-gray-200 rounded-lg py-3 px-4 text-sm w-full focus:ring-2 ${className} ${
            prependIcon ? "pl-14" : ""
          } ${appendIcon ? "pr-14" : ""} ${disabled ? "border-none text-gray-900" : ""}  ${
            passValidation ? "border-success-main" : ""
          } ${failedValidation ? "border-danger-main" : ""}`}
          value={value}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => {
            onValueChanged(ev);
          }}
          onBlur={(ev: ChangeEvent<HTMLInputElement>) => {
            onFocusOut(ev);
          }}
        />

        {appendIcon && (
          <span
            className={`absolute right-0 rounded-r-lg flex items-center justify-center w-12 h-full p-4 group ${appendIconContainerClass}`}
            onClick={onAppendClicked}
          >
            {appendIcon}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormGroup;