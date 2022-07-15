import clsx from "clsx";
import { X } from "react-feather";
import BrowserImageSize from "browser-image-size";

import ImageDropZone from "./ImageDropZone";
import ErrorMessage from "./ErrorMessage";

import styles from "../../styles/custom.module.css";

const FeaturedImage = ({
  id,
  image,
  setImage,
  setImgDimension,
  errorMessage,
  required,
}) => {
  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    const img = URL.createObjectURL(acceptedFiles[0]);
    BrowserImageSize(img).then((size) => setImgDimension(size));
  };

  return (
    <>
      <label className="form-label">Featured Image</label>
      <p className="text-muted fw-light mb-2">
        Recommended Image size is{" "}
        <span className="badge bg-danger">800 x 533</span>. You can upload
        bigger size image but No lower than the recommended size please.
      </p>

      {!image && <ImageDropZone id={id} onDrop={handleDrop} />}

      {image && (
        <div className="card w-100 bg-light">
          <img
            src={URL.createObjectURL(image)}
            className={styles["featured-image"]}
            alt="featured-image"
            required={required}
          />
          <button
            type="button"
            className={clsx("btn btn-danger shadow", styles["delete-icon"])}
            onClick={() => setImage(null)}
          >
            <X />
          </button>
        </div>
      )}

      <ErrorMessage message={errorMessage} />
    </>
  );
};

export default FeaturedImage;
