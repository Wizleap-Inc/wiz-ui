import { Meta, StoryObj } from "@storybook/react";

import {
  WizCardTable,
  WizCardThead,
  WizCardTbody,
  WizCardTr,
  WizCardTh,
  WizCardTd,
} from "../components";

const meta: Meta<typeof WizCardTr> = {
  title: "Base/Tables/Card",
  component: WizCardTr,
  argTypes: {
    onClick: {
      action: "onClick",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### WizCardTable

WizCardTableは、カード調のテーブルを作成するコンポーネントです。
一列ごとにカードとして生成されるため、Trに対してクリックイベントを設定することができます。
router-pushなどと組み合わせて、クリックした行に対応するページに遷移するような使い方ができます。
`,
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof WizCardTr> = {
  render: (args) => (
    <WizCardTable>
      <WizCardThead>
        <WizCardTr>
          {[1, 2, 3].map((i) => (
            <WizCardTh key={i}>Column {i}</WizCardTh>
          ))}
        </WizCardTr>
      </WizCardThead>
      <WizCardTbody>
        {[1, 2, 3].map((i) => (
          <WizCardTr key={i} {...args}>
            {[1, 2, 3].map((j) => (
              <WizCardTd key={j}>Row {i}</WizCardTd>
            ))}
          </WizCardTr>
        ))}
      </WizCardTbody>
    </WizCardTable>
  ),
};

export const Fixed: StoryObj<typeof WizCardTable> = {
  args: {
    fixed: true,
    width: "600px",
  },
  render: (args) => (
    <WizCardTable {...args}>
      <WizCardThead>
        <WizCardTr>
          {[1, 2, 3].map((i) => (
            <WizCardTh key={i} width={`calc(100px * ${i})`}>
              Column {i}
            </WizCardTh>
          ))}
        </WizCardTr>
      </WizCardThead>
      <WizCardTbody>
        {[1, 2, 3].map((i) => (
          <WizCardTr key={i}>
            {[1, 2, 3].map((j) => (
              <WizCardTd key={j}>Row {i}</WizCardTd>
            ))}
          </WizCardTr>
        ))}
      </WizCardTbody>
    </WizCardTable>
  ),
};

export const UnionColumn: StoryObj<typeof WizCardTh> = {
  args: {
    colSpan: 2,
  },
  render: (args) => (
    <WizCardTable>
      <WizCardThead>
        <WizCardTr>
          {[1, 2].map((i) => (
            <WizCardTh key={i} {...args}>
              Column {i}
            </WizCardTh>
          ))}
        </WizCardTr>
      </WizCardThead>
      <WizCardTbody>
        {[1, 2, 3].map((i) => (
          <WizCardTr key={i}>
            {[1, 2, 3, 4].map((j) => (
              <WizCardTd key={j}>Row {i}</WizCardTd>
            ))}
          </WizCardTr>
        ))}
      </WizCardTbody>
    </WizCardTable>
  ),
};

export const Example: StoryObj<typeof WizCardTr> = {
  render: (args) => {
    const headers = [
      "ID・ステータス",
      "氏名・電話番号",
      "相談日時・相談内容",
      "相談場所・居住地域",
      "募集形態・単価",
    ];
    const rows = [
      ["1234567890", "6回目面談前"],
      ["田中 太郎", "090-1234-5678"],
      ["2022/10/31(月)19:00", "つみたて・投資"],
      ["オンライン", "群馬県安中市鷲宮"],
      ["共同募集", "ー"],
    ];

    return (
      <WizCardTable>
        <WizCardThead>
          <WizCardTr>
            {headers.map((header, i) => (
              <WizCardTh key={i}>{header}</WizCardTh>
            ))}
          </WizCardTr>
        </WizCardThead>
        <WizCardTbody>
          {[1, 2, 3].map((i) => (
            <WizCardTr key={i} {...args}>
              {rows.map((row, j) => (
                <WizCardTd key={j}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {row.map((item, k) => (
                      <div key={k}>{item}</div>
                    ))}
                  </div>
                </WizCardTd>
              ))}
            </WizCardTr>
          ))}
        </WizCardTbody>
      </WizCardTable>
    );
  },
};
