export interface ITextInputProps {
  id: string;
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  prefix?: JSX.Element;
  validation?: ITextInputValidations;
  customContainerClassName?: string;
}

interface ITextInputValidations {
  required: boolean;
  message?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  validator?: (
    rule: RuleObject,
    value: string | number | unknown,
    callback: (error?: string) => void
  ) => void;
}
