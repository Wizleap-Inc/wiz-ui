import { Meta, StoryObj } from "@storybook/react";

import {
  WizFlatTable,
  WizFlatThead,
  WizFlatTbody,
  WizFlatTr,
  WizFlatTh,
  WizFlatTd,
} from "../components";

const meta: Meta<typeof WizFlatTr> = {
  title: "Base/Tables/Flat",
  component: WizFlatTr,
  argTypes: {
    onClick: {
      action: "onClick",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof WizFlatTr> = {
  render: (args) => (
    <WizFlatTable>
      <WizFlatThead>
        <WizFlatTr>
          {[1, 2, 3].map((i) => (
            <WizFlatTh key={i}>Column {i}</WizFlatTh>
          ))}
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        {[1, 2, 3].map((i) => (
          <WizFlatTr key={i} {...args}>
            {[1, 2, 3].map((j) => (
              <WizFlatTd key={j}>Row {i}</WizFlatTd>
            ))}
          </WizFlatTr>
        ))}
      </WizFlatTbody>
    </WizFlatTable>
  ),
};

export const Fixed: StoryObj<typeof WizFlatTable> = {
  args: {
    fixed: true,
    width: "600px",
  },
  render: (args) => (
    <WizFlatTable {...args}>
      <WizFlatThead>
        <WizFlatTr>
          {[1, 2, 3].map((i) => (
            <WizFlatTh key={i} width={`calc(100px * ${i})`}>
              Column {i}
            </WizFlatTh>
          ))}
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        {[1, 2, 3].map((i) => (
          <WizFlatTr key={i}>
            {[1, 2, 3].map((j) => (
              <WizFlatTd key={j}>Row {i}</WizFlatTd>
            ))}
          </WizFlatTr>
        ))}
      </WizFlatTbody>
    </WizFlatTable>
  ),
};

export const WithRowHeader: StoryObj<typeof WizFlatTr> = {
  render: (args) => (
    <WizFlatTable>
      <WizFlatThead>
        <WizFlatTr>
          {[1, 2, 3].map((i) => (
            <WizFlatTh key={i}>Column {i}</WizFlatTh>
          ))}
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        {[1, 2, 3].map((i) => (
          <WizFlatTr key={i} {...args}>
            {[1, 2, 3].map((j) => (
              <>
                {j === 1 && (
                  <WizFlatTh key={j} scope="row">
                    Row {i}
                  </WizFlatTh>
                )}
                {j > 1 && <WizFlatTd key={j}>Row {i}</WizFlatTd>}
              </>
            ))}
          </WizFlatTr>
        ))}
      </WizFlatTbody>
    </WizFlatTable>
  ),
};
