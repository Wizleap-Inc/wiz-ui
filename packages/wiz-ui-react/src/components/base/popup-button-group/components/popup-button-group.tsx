import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupStyle,
  popupButtonGroupDisabledCursorStyle,
  borderRadiusStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import clsx from "clsx";
import { FC, useMemo } from "react";

import { WizVStack } from "@/components";

import { ButtonGroupItem, ItemElement } from "../types";

import { ButtonItem } from "./button-item";
import { DividerItem } from "./divider-item";
import { GroupItem } from "./group-item";

interface Props {
  options: ButtonGroupItem[];
  width?: string;
  p?: SpacingKeys;
  borderRadius?: SpacingKeys;
  disabled?: boolean;
  expand?: boolean;
  groupDivider?: boolean;
  buttonDivider?: boolean;
  depth?: number;
  showExLabel?: boolean;
}

const PopupButtonGroup: FC<Props> = ({
  options,
  width = "10rem",
  p = "no",
  borderRadius = "no",
  disabled = false,
  expand = false,
  groupDivider = false,
  buttonDivider = false,
  depth = 0,
  showExLabel = false,
}) => {
  const items = useMemo(() => {
    const divider: ItemElement = { kind: "divider" };
    const items = options
      .map((opt, i) => {
        if (opt.kind === "divider") {
          return [divider];
        }
        const optionItem: ItemElement = {
          kind: "item",
          item: opt,
        };
        if (i + 1 === options.length) return [optionItem];
        switch (options[i].kind) {
          case "group": {
            return groupDivider ? [optionItem, divider] : [optionItem];
          }
          case "button": {
            return buttonDivider && options[i + 1].kind === "button"
              ? [optionItem, divider]
              : [optionItem];
          }
          case "divider": {
            return [];
          }
        }
      })
      .flat();
    return items;
  }, [buttonDivider, groupDivider, options]);

  return (
    <div
      className={clsx(
        popupButtonGroupStyle,
        disabled && popupButtonGroupDisabledCursorStyle,
        depth === 0 && borderRadiusStyle[borderRadius]
      )}
      style={{ minWidth: expand ? "100%" : width }}
    >
      <WizVStack gap="xs2" p={depth === 0 ? p : "no"}>
        {items.map((item, i) => {
          if (item.kind === "divider") {
            return <DividerItem key={`divider-${i}`} />;
          } else if (item.item.kind === "group") {
            return (
              <GroupItem
                key={`group-${i}-${item.item.title}`}
                item={item.item}
                disabled={disabled}
                depth={depth}
              />
            );
          } else if (item.item.kind === "button") {
            return (
              <ButtonItem
                key={`button-${i}-${item.item.option.value}`}
                item={item.item}
                disabled={disabled}
                depth={depth}
                showExLabel={showExLabel}
              />
            );
          }
        })}
      </WizVStack>
    </div>
  );
};

PopupButtonGroup.displayName = ComponentName.PopupButtonGroup;

export const WizPopupButtonGroup = PopupButtonGroup;
