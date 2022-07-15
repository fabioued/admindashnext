import { useState } from "react";
import clsx from "clsx";
import Dropzone from "react-dropzone";
import { UploadCloud } from "react-feather";

import styles from "../../styles/custom.module.css";

const ImageDropZone = ({ id, onDrop }) => {
  const [dragAreaHovered, setDragAreaHovered] = useState(false);
  const getHelperText = (isDragReject, isDragAccept) => {
    if (isDragAccept) {
      return "Drop the image!";
    }
    return isDragReject
      ? "Please select a single image file only!"
      : "Click to upload or drop your images here";
  };

  return (
    <Dropzone
      accept={{
        "image/jpeg": [],
        "image/png": [],
      }}
      multiple={false}
      onDrop={onDrop}
    >
      {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
        <section>
          <div {...getRootProps()}>
            <input id={id} {...getInputProps()} />

            <div
              className={clsx(
                "card w-100 bg-light p-4 text-center",
                styles["drag-area"],
                {
                  "border-danger": isDragReject,
                  "border-brand": isDragAccept,
                }
              )}
              onMouseEnter={() => setDragAreaHovered(true)}
              onMouseLeave={() => setDragAreaHovered(false)}
            >
              <div
                className={clsx(
                  "d-flex justify-content-center align-items-center",
                  "mx-auto mb-3",
                  "bg-white text-secondary",
                  "rounded-circle shadow-sm",
                  styles["upload-icon-container"],
                  {
                    "text-danger": isDragReject,
                    "text-brand": isDragAccept,
                  }
                )}
              >
                <UploadCloud
                  width="100"
                  height="100"
                  className={clsx(styles["upload-icon"], {
                    "text-brand": dragAreaHovered,
                  })}
                />
              </div>
              <p
                className={clsx("fw-light mb-2 fs-6", styles["helper-text"], {
                  "text-muted": !dragAreaHovered && !isDragReject,
                  "text-brand": dragAreaHovered || isDragAccept,
                  "text-danger": isDragReject,
                })}
              >
                {getHelperText(isDragReject, isDragAccept)}
              </p>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageDropZone;
