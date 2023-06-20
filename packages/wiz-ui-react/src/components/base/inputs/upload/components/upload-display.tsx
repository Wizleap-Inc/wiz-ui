import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/upload-display.css";
import clsx from "clsx";
import { FC } from "react";

import { WizHStack, WizLineGraph, WizVStack } from "@/components";

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
            {/* FIXME: アイコンにクラス名を適用するために WizICircleCheck の SVG をコピーして使う */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              width="1em"
              viewBox="0 0 24 24"
              className={clsx(
                styles.circleCheckIconStyle,
                isUploaded
                  ? styles.circleCheckIconCompletedStyle
                  : styles.circleCheckIconDefaultStyle
              )}
            >
              <path d="m10.55 15.9 6.4-6.4-.7-.7-5.7 5.7-2.85-2.85-.7.7ZM12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm0-1q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z" />
            </svg>
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
              {/* FIXME: アイコンにクラス名を適用するために WizIAttachFile の SVG をコピーして使う */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                width="1em"
                viewBox="0 0 24 24"
                className={styles.attachFileIconStyle}
              >
                <path d="M11.5 21.775q-2.1 0-3.575-1.475T6.45 16.725v-11.1q0-1.525 1.075-2.6Q8.6 1.95 10.125 1.95q1.5 0 2.575 1.075 1.075 1.075 1.075 2.6v10q0 .95-.662 1.6-.663.65-1.613.65t-1.613-.65q-.662-.65-.662-1.6V6.05q0-.175.125-.3t.325-.125q.2 0 .325.125t.125.3v9.575q0 .575.387.975.388.4.988.4t.988-.4q.387-.4.387-.975v-10q0-1.175-.8-1.975t-1.95-.8q-1.175 0-1.975.8t-.8 1.975v11.1q0 1.725 1.212 2.938 1.213 1.212 2.938 1.212t2.938-1.212q1.212-1.213 1.212-2.938V6.05q0-.175.125-.3t.325-.125q.175 0 .313.125.137.125.137.3v10.675q0 2.1-1.475 3.575T11.5 21.775Z" />
              </svg>
              <span>{file.name}</span>
            </WizHStack>
          </div>
        ))}
    </WizVStack>
  );
};

UploadDisplay.displayName = ComponentName.UploadDisplay;

export const WizUploadDisplay = UploadDisplay;
