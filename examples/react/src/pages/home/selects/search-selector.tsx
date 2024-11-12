import { WizSearchSelector } from "@wizleap-inc/wiz-ui-react";
import { SearchSelectorOption } from "@wizleap-inc/wiz-ui-react/dist/components/base/inputs/search-selector/components/types";
import { useCallback, useState } from "react";

const getDummyOptions = (label: string, count: number, exLabel?: string) => {
  const options: SearchSelectorOption[] = [];
  for (let i = 1; i <= count; i++) {
    options.push({ label: label + i, value: i, exLabel });
    options.push({ label: label + i * 10, value: i * 10, exLabel });
  }
  return options;
};

export const SearchSelectorNum = () => {
  const [values, setValues] = useState<number[]>([]);
  const [options, setOptions] = useState<SearchSelectorOption[]>(
    getDummyOptions("Option", 3)
  );
  const onCreate = useCallback(
    (newOption: string) => {
      const option = { label: newOption, value: options.length + 1000 };
      setOptions([...options, option]);
      setValues((vs) => [...vs, option.value]);
    },
    [options]
  );
  return (
    <div>
      <div>Selected number values: [{values.join(", ")}]</div>

      <WizSearchSelector
        options={options}
        values={values}
        onChangeValues={(changed) => setValues(changed)}
        onCreate={onCreate}
        addable
      />
    </div>
  );
};

export const SearchSelectorStr = () => {
  const [values, setValues] = useState<string[]>([]);
  const [options, setOptions] = useState<SearchSelectorOption<string>[]>(
    getDummyOptions("Option", 3).map((option) => ({
      ...option,
      value: option.value.toString().padStart(4, "0"),
    }))
  );

  const onCreate = useCallback(
    (newOption: string) => {
      const option = {
        label: newOption,
        value: options.length.toString().padStart(4, "0"),
      };
      setOptions([...options, option]);
      setValues((vs) => [...vs, option.value]);
    },
    [options]
  );
  return (
    <div>
      <div>Selected string values: [{values.join(", ")}]</div>
      <WizSearchSelector
        options={options}
        values={values}
        onChangeValues={(changed) => setValues(changed)}
        onCreate={onCreate}
        addable
      />
    </div>
  );
};
