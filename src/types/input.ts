export enum InputActions {
  INPUT_CHANGE = 'INPUT_CHANGE',
  INPUT_BLUR = 'INPUT_BLUR',
  INPUT_FOCUS = 'INPUT_FOCUS',
  CLEAR_INPUT = 'CLEAR_INPUT',
  SET_INPUT = 'SET_INPUT',
}

export type FormAction = {
  type: InputActions;
  data: InputState;
};

export type InputState = {
  value: string;
  error: string;
  hasError: boolean;
  active: boolean;
  name: string;
  isFormValid: boolean;
};
export type FormState = {
  [key: string]: InputState;
};

export type onChangeProps = {text: string; name: string};

export type onfocusProps = {
  name: string;
};

export type onBlurProps = {
  name: string;
};

export type InputProps = {
  onChange: ({text, name}: onChangeProps) => void;
  name: string;
  placeholder?: string;
  value: string;
  onFocus: ({name}: onfocusProps) => void;
  onBlur: ({name}: onBlurProps) => void;
  error: string;
  hasError: boolean;
  active: boolean;
  label: string;
  secureTextEntry?: boolean;
};
