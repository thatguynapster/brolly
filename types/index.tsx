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
  min?: number | string;
  max?: number | string;
}

export interface IListBoxProps {
  className?: string;
  label?: string;
  id: string;
  values: {
    name: string;
    value: string;
    id: string;
  }[];
  selected?: {
    name: string;
    value: string;
    id: string;
  };
  onValueChange: (ev: { name: string; value: string; id: string }) => void;
}

export interface TypeOfUseProps {
  name: string;
  value: string;
  id: string;
}
export interface IModalProps {
  show: boolean;
  data?: any;
  onConfirm?: Function;
  onClose: Function;
  className?: string;
}
