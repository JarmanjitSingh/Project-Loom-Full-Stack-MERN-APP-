import JoditEditor, { Jodit } from "jodit-react";
import { useMemo, useRef } from "react";

type TextEditorPropTypes = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const TextEditor = ({ content, setContent }: TextEditorPropTypes) => {
  const editor = useRef<Jodit | null>(null);

  console.log(content);

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typing...",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "ul",
        "ol",
        "indent",
        "outdent",
        "align",
        "paragraph",
        "link",
        "unlink",
        "brush",
        "eraser"
      ],
      toolbarAdaptive: false,
      addNewLine: false,
      
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      // tabIndex={1} // tabIndex of textarea
      onBlur={(newContent: string) => setContent(newContent)}
      // onChange={(newContent: string) => setContent(newContent)}
    />
  );
};

export default TextEditor;
