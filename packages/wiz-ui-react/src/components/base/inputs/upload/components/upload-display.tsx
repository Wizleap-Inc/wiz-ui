import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/upload-display.css";
import clsx from "clsx";
import { FC } from "react";

import {
  WizHStack,
  WizIAttachFile,
  WizICircleCheck,
  WizLineGraph,
  WizVStack,
} from "@/components";

type Props = {
  files: File[];
  uploadingFileCount: number;
  completedFileCount: number;
  progress: number;
  isUploaded: boolean;
  isUploading: boolean;
  multiple: boolean;
};

const UploadDisplay: FC<Props> = ({
  files,
  uploadingFileCount,
  completedFileCount,
  progress,
  isUploaded,
  isUploading,
  multiple,
}) => {
  const shouldShowFileList = multiple || (!multiple && !isUploading);

  const shouldFadeIn = (index: number) => {
    const uploadedFileCount = files.length - uploadingFileCount;
    if (
      (uploadingFileCount === 1 && index === files.length - 1) ||
      files.length === uploadingFileCount ||
      index >= uploadedFileCount
    ) {
      return true;
    }
    return false;
  };

  return (
    <WizVStack gap="sm">
      {isUploading && (
        <div
          className={clsx(
            styles.uploadDisplayStyle,
            isUploaded && styles.uploadDisplayFadeOutStyle
          )}
        >
          <span>
            {isUploaded
              ? "ファイルアップロード完了"
              : `ファイルアップロード中…（${completedFileCount}/${uploadingFileCount}）`}
          </span>
          <WizHStack align="center" gap="xs" wrap={false}>
            <WizLineGraph percentage={progress} />
            <div
              className={clsx(
                styles.circleCheckIconStyle,
                isUploaded
                  ? styles.circleCheckIconCompletedStyle
                  : styles.circleCheckIconDefaultStyle
              )}
              style={{
                fontSize: "1.5rem",
              }}
            >
              <WizICircleCheck />
            </div>
          </WizHStack>
        </div>
      )}
      {shouldShowFileList &&
        files.map((file, i) => (
          <div
            key={`${i}-${file.name}`}
            className={clsx(
              styles.uploadDisplayStyle,
              shouldFadeIn(i) && styles.uploadDisplayFadeInStyle
            )}
          >
            <WizHStack align="center" gap="xs2">
              <div
                className={styles.attachFileIconStyle}
                style={{ fontSize: "1.5rem" }}
              >
                <WizIAttachFile />
              </div>
              <span>{file.name}</span>
            </WizHStack>
          </div>
        ))}
    </WizVStack>
  );
};

UploadDisplay.displayName = ComponentName.UploadDisplay;

export const WizUploadDisplay = UploadDisplay;
