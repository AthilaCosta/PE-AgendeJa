export interface ITextInputProps {
    id: string;
    defaultValue?: string | number;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
    prefix?: JSX.Element;
    validation?: ITextInputValidations;
    customContainerClassName?: string;
    disable?: boolean;
    invertColorLabel?: boolean;
  }
  
  interface ITextInputValidations {
    required: boolean;
    message?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: (
      rule: RuleObject,
      value: string | number | unknown,
      callback: (error?: string) => void,
    ) => void;
  }
  