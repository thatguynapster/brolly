import { Dispatch, ReactNode } from "react";

export interface IAuth {
  GLOBAL_OBJ: IAuthState;
  AUTH_LOGIN?: (payload: IAuthPayload) => Dispatch<IAuthState>;
  AUTH_LOGOUT?: () => Dispatch<IAuthState>;
}

export interface IAuthState {
  isLoggedIn?: boolean;
  token?: string;
  data: any;
  rememberMe?: boolean;
}

export interface IAuthAction {
  type: string;
  payload?: IAuthPayload;
}

export interface IAuthPayload {
  isLoggedIn?: boolean;
  token?: string;
  data: any;
  currentPage?: string;
  rememberMe?: boolean;
}

export interface IHeaderProps {
  title: string;
  canonical?: string;
}

export interface INavbarProps {
  variant?: string;
  classNames: string;
  showSidebar: () => void;
  onRefresh: () => void;
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
  editable?: boolean;
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
