import { ChangeEvent, FC, useState } from "react";
import { IFormGroupProps } from "../../types";

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
}) => {
  const [editField, setEditField] = useState<boolean>(false);
  return (
    <>
      {editField ? (
        ""
      ) : (
        <div className="flex flex-col box-border w-full p-0 font-medium text-xs">
          {label && (
            <label htmlFor={id} className="w-full text-gray-900 p-0 mb-1">
              {label}
            </label>
          )}

          <div className={`flex flex-row items-center justify-center ${disabled && "bg-gray-100"} relative`}>
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
              className={`border${prependIcon ? "pl-14" : " "}outline-none border-gray-200${
                appendIcon ? "pr-14" : " "
              }py-3 px-4${disabled ? "border-none text-gray-900" : " "}text-sm${
                failedValidation ? "border-danger-main" : " "
              }w-full${passValidation ? "border-success-main" : " "}focus:ring-2 ${className}`}
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
