import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/upload.css";
import clsx from "clsx";
import { ChangeEventHandler, DragEventHandler, FC, useState } from "react";

import { WizUploadDisplay, WizVStack } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  setupXHR: () => XMLHttpRequest;
  multiple?: boolean;
};

const UploadInput: FC<Props> = ({
  className,
  style,
  multiple = false,
  setupXHR,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadingFileCount, setUploadingFileCount] = useState(0);
  const [completedFileCount, setCompletedFileCount] = useState(0);
  const [combinedProgress, setCombinedProgress] = useState(0);

  const isUploadable = (!multiple && !isUploaded) || multiple;

  const uploadFiles = (newFiles: File[]) => {
    setIsUploaded(false);
    setIsUploading(true);
    setUploadingFileCount(newFiles.length);
    setCombinedProgress(0);

    const upload = (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const xhr = setupXHR();
      xhr.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const fileProgress = Math.round((event.loaded / event.total) * 100);
          setCombinedProgress(
            (current) => current + fileProgress / newFiles.length
          );
        }
      });
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          setCompletedFileCount((current) => {
            const updated = current + 1;
            if (updated === newFiles.length) {
              setIsUploaded(true);
              // フェードアウトを待つ
              setTimeout(() => {
                setIsUploading(false);
                setCompletedFileCount(0);
              }, 500);
            }
            return updated;
          });
        }
      });
      xhr.send(formData);
    };

    newFiles.forEach((file) => upload(file));
  };

  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragEnter(false);

    const newFiles = Array.from(e.dataTransfer.files);
    if (newFiles.length === 0) {
      return;
    }
    if (multiple) {
      setFiles((current) => [...current, ...newFiles]);
    } else {
      setFiles((current) => [...current, newFiles[0]]);
    }
    uploadFiles(newFiles);
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newFiles = Array.from(e.target.files ?? []);
    if (newFiles.length === 0) {
      return;
    }
    setFiles((current) => [...current, ...newFiles]);
    uploadFiles(newFiles);
  };

  return (
    <WizVStack className={className} style={style} gap="xl3">
      {isUploadable && (
        <label
          className={clsx(
            styles.uploadStyle,
            isDragEnter && styles.uploadEnterStyle
          )}
          onDragEnter={() => setIsDragEnter(true)}
          onDragLeave={() => setIsDragEnter(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className={styles.uploadInputStyle}
            onChange={handleChangeInput}
            multiple={multiple}
          />
          こちらにドラック＆ドロップしてファイルをアップロード
        </label>
      )}
      <WizUploadDisplay
        files={files}
        uploadingFileCount={uploadingFileCount}
        completedFileCount={completedFileCount}
        progress={combinedProgress}
        isUploaded={isUploaded}
        isUploading={isUploading}
        multiple={multiple}
      />
    </WizVStack>
  );
};

UploadInput.displayName = ComponentName.UploadInput;

export const WizUploadInput = UploadInput;
