import { WizSelectBox } from "@wizleap-inc/wiz-ui-react";
import { useState } from "react";

const getDummyOptions = (label: string, length: number, exLabel?: string) => {
  return Array.from({ length }).map((_, i) => ({
    label: label + (i + 1),
    value: i + 1,
    exLabel,
  }));
};

export const SelectBoxNum = () => {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div>
      <div>Selected number value: {value}</div>
      <WizSelectBox
        options={getDummyOptions("Option", 5)}
        value={value}
        onChange={(updated) => setValue(updated)}
      />
    </div>
  );
};

export const SelectBoxStr = () => {
  const stringOptions = getDummyOptions("Option", 5).map((option) => ({
    ...option,
    value: option.value.toString().padStart(4, "0"),
  }));

  const [value, setValue] = useState<string | null>(null);

  return (
    <div>
      <div>Selected string value: {value}</div>
      <WizSelectBox
        options={stringOptions}
        value={value}
        onChange={(updated) => setValue(updated)}
      />
    </div>
  );
};
