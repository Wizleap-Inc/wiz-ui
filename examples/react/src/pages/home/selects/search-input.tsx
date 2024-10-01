import { WizSearchInput } from "@wizleap-inc/wiz-ui-react";
import { useState } from "react";

const normalOptions = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

export const SearchInputNum = () => {
  const [values, setValues] = useState<number[]>([]);
  return (
    <div>
      <div>Selected values: [{values.join(", ")}]</div>
      <WizSearchInput
        options={normalOptions}
        values={values}
        onChangeValues={(changed) => setValues(changed)}
      />
    </div>
  );
};

export const SearchInputStr = () => {
  const stringOptions = normalOptions.map((option) => ({
    ...option,
    value: option.value.toString(),
  }));

  const [values, setValues] = useState<string[]>([]);

  return (
    <div>
      <div>Selected values: [{values.join(", ")}]</div>
      <WizSearchInput
        options={stringOptions}
        values={values}
        onChangeValues={(changed) => setValues(changed)}
      />
    </div>
  );
};
