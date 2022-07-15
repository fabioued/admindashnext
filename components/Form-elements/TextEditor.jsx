import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import ErrorMessage from "./ErrorMessage";

import { getEditorToolBarOptions } from "../../util";
import ImageUploadController from "../../controllers/ImageUploadController";
import { EDITOR_PLUGINS, TINYMCE_API_KEY } from "../../util/constant";

const TextEditor = ({ errorMessage, value, onChange }) => {
  const editorRef = useRef(null);
  const images_upload_handler = (blobInfo) => {
    return ImageUploadController.uploadEditorImage(blobInfo);
  };

  return (
    <>
      <Editor
        id="editor"
        apiKey={TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          width: "100%",
          menubar: "file edit view insert format tool table",
          plugins: EDITOR_PLUGINS,
          toolbar: getEditorToolBarOptions(),
          images_upload_url: "",
          skin: "small",
          images_upload_handler,
        }}
        value={value}
        onEditorChange={onChange}
      />
      <ErrorMessage message={errorMessage} />
    </>
  );
};

export default TextEditor;
