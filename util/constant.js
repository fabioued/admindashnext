export const MIN_IMG_WIDTH = 800;

export const MIN_IMG_HEIGHT = 533;

export const MIN_DIM_ERR_MSG = "image dimension should be above [800x533]";

export const API_URL = "https://blogapi.ourbantaba.com/blogs";

export const POST_FAILED_MSG = "Failed to posted! The title must be unique";

export const POST_SUCCESS_MSG = "Post Created!";

export const IMG_UPLOAD_FAILED_MSG = "Error in uploading image";

export const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

export const CLOUNDNARY_URL =
  "https://api.cloudinary.com/v1_1/bantaba/image/upload";

export const UPLOAD_PRESET = "Users-Avatars";

export const EDITOR_TOOLBAR_OPTIONS = [
  "undo redo paste pagebreak visualblocks visualchars anchor charmap help nonbreaking",
  " blocks ",
  "bold italic",
  "forecolor backcolor",
  "alignleft aligncenter alignright alignjustify",
  "bullist numlist outdent indent",
  "removeformat",
  "image",
  "help",
];

export const EDITOR_PLUGINS = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "visualchars",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "help",
  "wordcount",
  "pagebreak",
  "nonbreaking",
];

export const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
];

export const RADIO_BTN_OPTIONS = [
  { name: "Show post to public", value: true },
  { name: "Hide post to public", value: false },
];

export const DEFAULT_TAGS = [
  { label: "Diaspora", value: "Diaspora" },
  { label: "Africa", value: "Africa" },
  { label: "Bantaba", value: "Bantaba" },
];

export const INIT_FORM_VALUE = {
  title: "",
  author: "",
  show_post: false,
};
