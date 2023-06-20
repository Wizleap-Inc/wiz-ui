import { SearchInputOption } from "../types";

export const defaultOption: SearchInputOption[] = [
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

export const openOption: SearchInputOption[] = [
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
            children: [],
          },
          {
            label: "保険商品11",
            value: 11,
            children: [],
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
            children: [],
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

export const longLabelOption: SearchInputOption[] = [
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

export const expandOption: SearchInputOption[] = [
  {
    label: "親要素1",
    value: 1,
    children: [
      {
        label: "子要素2",
        value: 2,
        children: [],
      },
      {
        label: "子要素3",
        value: 3,
        children: [],
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
            children: [],
          },
          {
            label: "孫要素7",
            value: 7,
            children: [],
          },
        ],
      },
      {
        label: "子要素8",
        value: 8,
        children: [],
      },
    ],
  },
  {
    label: "親要素9",
    value: 9,
    children: [],
  },
];

export const simpleOption: SearchInputOption[] = [
  {
    label: "選択肢1",
    value: 1,
    children: [],
  },
  {
    label: "選択肢2",
    value: 2,
    children: [],
  },
  {
    label: "選択肢3",
    value: 3,
    children: [],
  },
];
