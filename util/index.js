import { EDITOR_TOOLBAR_OPTIONS } from "./constant";

const getTagCode = (tag) => tag.toLowerCase().substring(0, 2);

const generatTag = (tag) => ({ name: tag.label, code: getTagCode(tag.label) });

export const getSlug = (str) => str.trim().toLowerCase().replace(/\s/g, "-");

export const getEditorToolBarOptions = () => EDITOR_TOOLBAR_OPTIONS.join(" | ");

export const getFormData = (
  formValue,
  lang,
  tags,
  keywords,
  content,
  image
) => {
  return {
    ...formValue,
    lang: lang?.value,
    tags: tags.map((t) => generatTag(t)),
    keywords: keywords.map((k) => generatTag(k)),
    content,
    slug: getSlug(formValue.title),
    image,
  };
};
