import { ReactNode } from "react";

export interface IHeaderProps {
  title: string;
  canonical?: string;
}

export interface IFormGroupProps {
  type: string;
  id: string;
  label?: string;
  prependIcon?: ReactNode;
  prependIconContainerClass?: string;
  onPrependClicked?: (ev: any) => void;
  appendIcon?: ReactNode;
  appendIconContainerClass?: string;
  onAppendClicked?: (ev: any) => void;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  readOnly?: boolean;
  passValidation?: boolean;
  failedValidation?: boolean;
  className?: string;
  onValueChanged: Function;
  onFocusOut: Function;
  autofocus?: boolean;
}
