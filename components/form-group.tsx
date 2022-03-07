import { PencilIcon } from "@heroicons/react/outline";
import { ChangeEvent, FC, useState } from "react";
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
  min,
  max,
  editable,
  isRequired,
}) => {
  const [editField, setEditField] = useState<boolean>(false);

  return (
    <>
      {editable && !editField ? (
        <div className="flex flex-col box-border w-full p-0">
          <label className="w-full text-gray-900 p-0 mb-1 font-medium text-xs">
            {label}
          </label>
          <p className="w-full flex flex-row items-center justify-between space-x-4 bg-transparent pl-3 p-1 rounded-md text-gray-700 group border text-xs">
            <span className="w-full truncate">{value}</span>
            <span
              className="invisible group-hover:visible hover:bg-gray-200 rounded-md p-3 cursor-pointer"
              onClick={() => {
                setEditField(true);
              }}
            >
              <PencilIcon className="w-4 h-4 text-priamry-main" />
            </span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col box-border w-full p-0 font-medium text-xs space-y-2">
          {label && (
            <label htmlFor={id} className="w-full text-gray-900 p-0">
              {label}
            </label>
          )}

          <div
            className={`flex flex-row items-center justify-center ${
              disabled && "bg-gray-300"
            } relative`}
          >
            {prependIcon && (
              <span
                className={`absolute left-0 flex items-center justify-center w-12 h-full p-4 ${prependIconContainerClass}`}
                onClick={onPrependClicked}
              >
                {prependIcon}
              </span>
            )}
            <input
              min={min}
              max={max}
              id={id}
              className={`border ${
                prependIcon ? "pl-14" : ""
              } outline-none border-gray-200 ${
                appendIcon ? "pr-14" : ""
              } py-3 px-4 ${
                disabled ? "border-none text-gray-900" : ""
              } text-sm ${
                failedValidation ? "border-danger-main" : " "
              } w-full ${
                passValidation ? "border-success-main" : ""
              } focus:ring-2 ${
                value === "" && !disabled ? "ring-2 ring-primary-border" : ""
              } ${className}`}
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
              required={isRequired}
            />

            {appendIcon && (
              <span
                className={`absolute right-0 flex items-center justify-center w-12 h-full p-4 group ${appendIconContainerClass}`}
                onClick={onAppendClicked}
              >
                {appendIcon}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FormGroup;
