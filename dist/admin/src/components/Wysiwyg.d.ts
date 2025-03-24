interface WysiwygProps {
    disabled?: boolean;
    error?: string;
    name: string;
    onChange: (e: any) => void;
    required?: boolean;
    label?: string;
    placeholder?: string;
    hint?: string;
    value?: any;
    attribute?: any;
}
declare const Wysiwyg: ({ name, onChange, value, label, disabled, error, required, hint, attribute }: WysiwygProps) => import("react/jsx-runtime").JSX.Element;
export default Wysiwyg;
