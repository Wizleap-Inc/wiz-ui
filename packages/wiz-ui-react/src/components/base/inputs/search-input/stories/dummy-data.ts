import { SearchInputOption } from "../components/types";

const tag = {
  label: "タグ",
};

export const normalOptions: SearchInputOption[] = [
  {
    label: "テスト会社1",
    value: 1,
    children: [
      {
        label: "保険商品1",
        value: 2,
        children: [],
      },
      {
        label: "保険商品2",
        value: 3,
        children: [],
      },
      {
        label: "テスト子会社3",
        value: 4,
        children: [
          {
            label: "保険商品4",
            value: 40,
            children: [
              {
                label: "保険商品5",
                value: 60,
                children: [],
              },
              {
                label: "保険商品6",
                value: 70,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "保険会社2",
    value: 5,
    children: [
      {
        label: "保険子会社1",
        value: 6,
        children: [
          {
            label: "保険商品7",
            value: 7,
            children: [],
          },
          {
            label: "保険商品8",
            value: 8,
            children: [],
          },
        ],
      },
      {
        label: "保険子会社2",
        value: 9,
        children: [
          {
            label: "保険商品10",
            value: 10,
            children: [
              {
                label: "10-オプション1",
                value: 101,
                children: [],
              },
              {
                label: "10-オプション2",
                value: 102,
                children: [],
              },
            ],
          },
          {
            label: "保険商品11",
            value: 11,
            children: [
              {
                label: "11-オプション1",
                value: 111,
                children: [
                  {
                    label: "opt 11-1-1",
                    value: 1111,
                    children: [],
                  },
                  {
                    label: "opt 11-1-2",
                    value: 1112,
                    children: [],
                  },
                ],
              },
              {
                label: "11-オプション2",
                value: 112,
                children: [
                  {
                    label: "opt 11-2-1",
                    value: 1121,
                    children: [],
                  },
                  {
                    label: "opt 11-2-2",
                    value: 1122,
                    children: [],
                  },
                ],
              },

              {
                label: "11-オプション3",
                value: 113,
                children: [],
              },
              {
                label: "11-オプション4",
                value: 114,
                children: [],
              },
              {
                label: "11-オプション5",
                value: 115,
                children: [
                  {
                    label: "opt 11-5-1",
                    value: 1151,
                    children: [],
                  },
                  {
                    label: "opt 11-5-2",
                    value: 1152,
                    children: [],
                  },
                ],
              },
              {
                label: "11-オプション6",
                value: 116,
                children: [],
              },
              {
                label: "11-オプション7",
                value: 117,
                children: [],
              },
              {
                label: "11-オプション8",
                value: 118,
                children: [],
              },
              {
                label: "11-オプション9",
                value: 119,
                children: [],
              },
              {
                label: "11-オプション10",
                value: 1110,
                children: [],
              },
            ],
          },
          {
            label: "保険商品12",
            value: 12,
            children: [],
          },
          {
            label: "保険商品13",
            value: 13,
            children: [],
          },
          {
            label: "保険商品14",
            value: 14,
            children: [],
          },
          {
            label: "保険商品15",
            value: 15,
            children: [
              {
                label: "15-オプション1",
                value: 151,
                children: [],
              },
              {
                label: "15-オプション2",
                value: 152,
                children: [],
              },
            ],
          },
          {
            label: "保険商品16",
            value: 16,
            children: [],
          },
          {
            label: "保険商品17",
            value: 17,
            children: [],
          },
          {
            label: "保険商品18",
            value: 18,
            children: [],
          },
          {
            label: "保険商品19",
            value: 19,
            children: [],
          },
          {
            label: "保険商品20",
            value: 20,
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: "テスト保険会社3",
    value: 21,
    children: [],
  },
];

export const longLabelOptions: SearchInputOption[] = [
  {
    label: "テスト会社1",
    value: 1,
    children: [
      {
        label: "保険商品1",
        value: 2,
        children: [],
      },
      {
        label: "保険商品2",
        value: 3,
        children: [],
      },
      {
        label: "保険商品3",
        value: 4,
        children: [],
      },
    ],
  },
  {
    label: "寿限無寿限無五劫の擦り切れ 海砂利水魚の水行末",
    value: 21,
    children: [],
  },
];

export const taggedOptions: SearchInputOption[] = [
  {
    label: "テスト会社1",
    value: 1,
    tag: tag,
    children: [
      {
        label: "保険商品1",
        value: 2,
        tag: tag,
        children: [],
      },
      {
        label: "保険商品2",
        value: 3,
        tag: tag,
        children: [],
      },
      {
        label: "テスト子会社3",
        value: 4,
        tag: tag,
        children: [
          {
            label: "保険商品4",
            value: 40,
            tag: tag,
            children: [
              {
                label: "保険商品5",
                value: 60,
                tag: tag,
                children: [],
              },
              {
                label: "保険商品6",
                value: 70,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "寿限無寿限無五劫の擦り切れ 海砂利水魚の水行末",
    value: 5,
    tag: tag,
    children: [
      {
        label: "寿限無寿限無五劫の擦り切れ 海砂利水魚の水行末",
        value: 6,
        tag: tag,
        children: [
          {
            label: "寿限無寿限無五劫の擦り切れ 海砂利水魚の水行末",
            value: 7,
            tag: tag,
            children: [],
          },
          {
            label: "寿限無寿限無五劫の擦り切れ 海砂利水魚の水行末",
            value: 8,
            tag: tag,
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: "テスト保険会社3",
    tag: tag,
    value: 21,
    children: [],
  },
  {
    label: "寿限無寿限無五劫の擦り切れ 海砂利水魚の水行末",
    tag: tag,
    value: 31,
    children: [],
  },
];

let valueCounter = 1;
// Function to get the next unique value
const getNextValue = (): number => {
  return valueCounter++;
};

// Function to generate grandchild elements
const generateGrandchildren = (
  startValue: number,
  count: number
): SearchInputOption[] => {
  const grandchildren: SearchInputOption[] = [];
  for (let i = 0; i < count; i++) {
    const grandchildValue = getNextValue();
    grandchildren.push({
      label: "孫要素" + (startValue + i),
      value: grandchildValue,
      children: [],
    });
  }
  return grandchildren;
};

// Function to generate child elements
const generateChildren = (
  startValue: number,
  count: number
): SearchInputOption[] => {
  const children: SearchInputOption[] = [];
  for (let i = 0; i < count; i++) {
    const childValue = getNextValue();
    children.push({
      label:
        "子要素" +
        (startValue + i) +
        " 寿限無寿限無五劫の擦り切れ海砂利水魚の水行末雲来末風来末食う寝る処に住む処やぶら小路の藪柑子",
      value: childValue,
      children: i % 2 === 0 ? generateGrandchildren(childValue * 10, 2) : [],
    });
  }
  return children;
};

// Function to generate additional parent elements
const generateParentElements = (
  startValue: number,
  count: number
): SearchInputOption[] => {
  const parentElements: SearchInputOption[] = [];
  for (let i = 0; i < count; i++) {
    const parentValue = getNextValue();
    parentElements.push({
      label: "親要素" + (startValue + i),
      value: parentValue,
      children: generateChildren(parentValue * 10, 2),
    });
  }
  return parentElements;
};

export const debugOptions: SearchInputOption[] = [
  {
    label: "親要素1",
    value: getNextValue(),
    children: generateChildren(getNextValue(), 20),
  },
  {
    label: "親要素4",
    value: getNextValue(),
    children: generateChildren(getNextValue(), 20),
  },
  {
    label: "親要素9",
    value: getNextValue(),
    children: [],
  },
  // Generate additional parent elements (up to 13)
  ...generateParentElements(getNextValue(), 13),
];
