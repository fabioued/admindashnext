import { IMG_UPLOAD_FAILED_MSG } from "../util/constant";
import blogsService from "../services/blogs/blogsService";

const uploadEditorImage = (blobInfo, setProgress) => {
  return new Promise(async (resolve, reject) => {
    const res = await blogsService.uploadToCloundary(blobInfo.blob(), setProgress);
    if (res) {
      resolve(res.url);
    } else {
      reject(IMG_UPLOAD_FAILED_MSG);
    }
  });
};

const ImageUploadController = { uploadEditorImage };

export default ImageUploadController;
