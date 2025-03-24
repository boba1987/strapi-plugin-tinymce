interface TinyEditorProps {
    onChange: (e: any) => void;
    name: string;
    value?: string;
    disabled?: boolean;
}
declare const TinyEditor: ({ onChange, name, value, disabled }: TinyEditorProps) => import("react/jsx-runtime").JSX.Element;
export default TinyEditor;
