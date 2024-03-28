import { SearchInputOption } from "../types";

export const defaultOption: SearchInputOption<number>[] = [
  {
    label: "テスト会社1",
    value: 1,
    children: [
      {
        label: "保険商品1",
        value: 2,
      },
      {
        label: "保険商品2",
        value: 3,
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
              },
              {
                label: "保険商品6",
                value: 70,
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
          },
          {
            label: "保険商品8",
            value: 8,
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
              },
              {
                label: "10-オプション2",
                value: 102,
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
                  },
                  {
                    label: "opt 11-1-2",
                    value: 1112,
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
                  },
                  {
                    label: "opt 11-2-2",
                    value: 1122,
                  },
                ],
              },

              {
                label: "11-オプション3",
                value: 113,
              },
              {
                label: "11-オプション4",
                value: 114,
              },
              {
                label: "11-オプション5",
                value: 115,
                children: [
                  {
                    label: "opt 11-5-1",
                    value: 1151,
                  },
                  {
                    label: "opt 11-5-2",
                    value: 1152,
                  },
                ],
              },
              {
                label: "11-オプション6",
                value: 116,
              },
              {
                label: "11-オプション7",
                value: 117,
              },
              {
                label: "11-オプション8",
                value: 118,
              },
              {
                label: "11-オプション9",
                value: 119,
              },
              {
                label: "11-オプション10",
                value: 1110,
              },
            ],
          },
          {
            label: "保険商品12",
            value: 12,
          },
          {
            label: "保険商品13",
            value: 13,
          },
          {
            label: "保険商品14",
            value: 14,
          },
          {
            label: "保険商品15",
            value: 15,
            children: [
              {
                label: "15-オプション1",
                value: 151,
              },
              {
                label: "15-オプション2",
                value: 152,
              },
            ],
          },
          {
            label: "保険商品16",
            value: 16,
          },
          {
            label: "保険商品17",
            value: 17,
          },
          {
            label: "保険商品18",
            value: 18,
          },
          {
            label: "保険商品19",
            value: 19,
          },
          {
            label: "保険商品20",
            value: 20,
          },
        ],
      },
    ],
  },
  {
    label: "テスト保険会社3",
    value: 21,
  },
];

export const openOption: SearchInputOption<number>[] = [
  {
    label: "テスト会社1",
    value: 1,
    children: [
      {
        label: "保険商品1",
        value: 2,
      },
      {
        label: "保険商品2",
        value: 3,
      },
      {
        label: "保険商品3",
        value: 4,
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
          },
          {
            label: "保険商品8",
            value: 8,
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
          },
          {
            label: "保険商品11",
            value: 11,
          },
          {
            label: "保険商品12",
            value: 12,
          },
          {
            label: "保険商品13",
            value: 13,
          },
          {
            label: "保険商品14",
            value: 14,
          },
          {
            label: "保険商品15",
            value: 15,
          },
          {
            label: "保険商品16",
            value: 16,
          },
          {
            label: "保険商品17",
            value: 17,
          },
          {
            label: "保険商品18",
            value: 18,
          },
          {
            label: "保険商品19",
            value: 19,
          },
          {
            label: "保険商品20",
            value: 20,
          },
        ],
      },
    ],
  },
  {
    label: "テスト保険会社3",
    value: 21,
  },
];

export const longLabelOption: SearchInputOption<number>[] = [
  {
    label: "テスト会社1",
    value: 1,
    children: [
      {
        label: "保険商品1",
        value: 2,
      },
      {
        label: "保険商品2",
        value: 3,
      },
      {
        label: "保険商品3",
        value: 4,
      },
    ],
  },
  {
    label: "寿限無寿限無五劫の擦り切れ 海砂利水魚の水行末",
    value: 21,
  },
];

export const expandOption: SearchInputOption<number>[] = [
  {
    label: "親要素1",
    value: 1,
    children: [
      {
        label: "子要素2",
        value: 2,
      },
      {
        label: "子要素3",
        value: 3,
      },
    ],
  },
  {
    label: "親要素4",
    value: 4,
    children: [
      {
        label: "子要素5",
        value: 5,
        children: [
          {
            label: "孫要素6",
            value: 6,
          },
          {
            label: "孫要素7",
            value: 7,
          },
        ],
      },
      {
        label: "子要素8",
        value: 8,
      },
    ],
  },
  {
    label: "親要素9",
    value: 9,
  },
];

const tag = {
  label: "タグ",
};

export const taggedOptions: SearchInputOption<number>[] = [
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
                tag: tag,
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

export const simpleOption: SearchInputOption<number>[] = [
  {
    label: "選択肢1",
    value: 1,
  },
  {
    label: "選択肢2",
    value: 2,
  },
  {
    label: "選択肢3",
    value: 3,
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
): SearchInputOption<number>[] => {
  const grandchildren: SearchInputOption<number>[] = [];
  for (let i = 0; i < count; i++) {
    const grandchildValue = getNextValue();
    grandchildren.push({
      label: "孫要素" + (startValue + i),
      value: grandchildValue,
    });
  }
  return grandchildren;
};

// Function to generate child elements
const generateChildren = (
  startValue: number,
  count: number
): SearchInputOption<number>[] => {
  const children: SearchInputOption<number>[] = [];
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
): SearchInputOption<number>[] => {
  const parentElements: SearchInputOption<number>[] = [];
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

export const debugOption: SearchInputOption<number>[] = [
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
  },
  // Generate additional parent elements (up to 13)
  ...generateParentElements(getNextValue(), 13),
];

export const emptyMessageOptions: SearchInputOption<number>[] = [
  {
    label: "テスト会社1",
    value: 1,
    children: [],
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
          },
          {
            label: "保険商品8",
            value: 8,
          },
        ],
      },
      {
        label: "保険子会社2",
        value: 9,
        children: [],
      },
    ],
  },
  {
    label: "テスト保険会社3",
    value: 21,
  },
];
