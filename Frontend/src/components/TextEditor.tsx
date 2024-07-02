import JoditEditor, { Jodit } from "jodit-react";
import { useMemo, useRef } from "react";
import { TaskType } from "./TaskModal";

type TextEditorPropTypes = {
  content: TaskType;
  setContent: React.Dispatch<React.SetStateAction<TaskType>>;
};

const TextEditor = ({ content, setContent }: TextEditorPropTypes) => {
  const editor = useRef<Jodit | null>(null);

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
        "eraser",
      ],
      toolbarAdaptive: false,
      addNewLine: false,
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={content.description}
      config={config}
      // tabIndex={1} // tabIndex of textarea
      onBlur={(newContent: string) =>
        setContent({ ...content, description: newContent })
      }
      // onChange={(newContent: string) => setContent(newContent)}
    />
  );
};

export default TextEditor;
