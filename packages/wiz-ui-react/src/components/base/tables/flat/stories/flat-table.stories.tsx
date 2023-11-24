import { Meta, StoryObj } from "@storybook/react";

import {
  WizFlatTable,
  WizFlatThead,
  WizFlatTbody,
  WizFlatTr,
  WizFlatTh,
  WizFlatTd,
} from "../components";

const meta: Meta<typeof WizFlatTable> = {
  title: "Base/Tables/Flat",
  component: WizFlatTable,
};

export default meta;

export const Default: StoryObj<typeof WizFlatTable> = {
  render: (args) => (
    <WizFlatTable {...args}>
      <WizFlatThead>
        <WizFlatTr>
          {[1, 2, 3].map((i) => (
            <WizFlatTh key={i}>Column {i}</WizFlatTh>
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

export const FontSize: StoryObj<typeof WizFlatTable> = {
  render: (args) => {
    const fontSizes = ["xs2", "xs", "sm", "md"] as const;
    return (
      <div>
        <h2>Font Size (Th)</h2>
        {fontSizes.map((fontSize) => (
          <div key={fontSize} style={{ paddingBottom: "1rem" }}>
            <span>Font Size: {fontSize}</span>
            <WizFlatTable {...args}>
              <WizFlatThead>
                <WizFlatTr>
                  {[1, 2, 3].map((i) => (
                    <WizFlatTh key={i} fontSize={fontSize}>
                      Column {i}
                    </WizFlatTh>
                  ))}
                </WizFlatTr>
              </WizFlatThead>
              <WizFlatTbody>
                {[1, 2, 3].map((i) => (
                  <WizFlatTr key={i}>
                    {[1, 2, 3].map((j) => (
                      <WizFlatTd v-for="j in 3" key={j}>
                        Row {i}
                      </WizFlatTd>
                    ))}
                  </WizFlatTr>
                ))}
              </WizFlatTbody>
            </WizFlatTable>
          </div>
        ))}
        <hr />
        <h2>Font Size (Td)</h2>
        {fontSizes.map((fontSize) => (
          <div key={fontSize} style={{ paddingBottom: "1rem" }}>
            <span>Font Size: {fontSize}</span>
            <WizFlatTable {...args}>
              <WizFlatThead>
                <WizFlatTr>
                  {[1, 2, 3].map((i) => (
                    <WizFlatTh key={i}>Column {i}</WizFlatTh>
                  ))}
                </WizFlatTr>
              </WizFlatThead>
              <WizFlatTbody>
                {[1, 2, 3].map((i) => (
                  <WizFlatTr key={i}>
                    {[1, 2, 3].map((j) => (
                      <WizFlatTd v-for="j in 3" key={j} fontSize={fontSize}>
                        Row {i}
                      </WizFlatTd>
                    ))}
                  </WizFlatTr>
                ))}
              </WizFlatTbody>
            </WizFlatTable>
          </div>
        ))}
      </div>
    );
  },
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

export const TextAlign: StoryObj<typeof WizFlatTable> = {
  render: (args) => {
    const textAligns: ("left" | "center" | "right")[] = [
      "left",
      "center",
      "right",
    ];
    return (
      <WizFlatTable {...args}>
        <WizFlatThead>
          <WizFlatTr>
            {textAligns.map((align, index) => (
              <WizFlatTh key={index} width="200px" align={align}>
                Column {index + 1}
              </WizFlatTh>
            ))}
          </WizFlatTr>
        </WizFlatThead>
        <WizFlatTbody>
          {[1, 2, 3].map((i) => (
            <WizFlatTr key={i}>
              {textAligns.map((align, index) => (
                <WizFlatTd key={index} width="200px" align={align}>
                  Row {index + 1}
                </WizFlatTd>
              ))}
            </WizFlatTr>
          ))}
        </WizFlatTbody>
      </WizFlatTable>
    );
  },
};

export const WithRowHeader: StoryObj<typeof WizFlatTable> = {
  render: (args) => (
    <WizFlatTable {...args}>
      <WizFlatThead>
        <WizFlatTr>
          {[1, 2, 3].map((i) => (
            <WizFlatTh key={i}>Column {i}</WizFlatTh>
          ))}
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        {[1, 2, 3].map((i) => (
          <WizFlatTr key={i}>
            <WizFlatTh scope="row">Row 1</WizFlatTh>
            {[1, 2].map((j) => (
              <WizFlatTd key={j}>Row {i}</WizFlatTd>
            ))}
          </WizFlatTr>
        ))}
      </WizFlatTbody>
    </WizFlatTable>
  ),
};

export const UnionRow: StoryObj<typeof WizFlatTable> = {
  render: (args) => (
    <WizFlatTable {...args}>
      <WizFlatThead>
        <WizFlatTr>
          {[1, 2, 3].map((i) => (
            <WizFlatTh key={i}>Column {i}</WizFlatTh>
          ))}
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr>
          <WizFlatTh scope="row" rowSpan={3}>
            Row 1
          </WizFlatTh>
          <WizFlatTd rowSpan={3}>Row 1</WizFlatTd>
          <WizFlatTd>Row 1</WizFlatTd>
        </WizFlatTr>
        {[2, 3].map((i) => (
          <WizFlatTr key={i}>
            <WizFlatTd>Row {i}</WizFlatTd>
          </WizFlatTr>
        ))}
      </WizFlatTbody>
    </WizFlatTable>
  ),
};

export const UnionColumn: StoryObj<typeof WizFlatTable> = {
  render: (args) => (
    <WizFlatTable {...args}>
      <WizFlatThead>
        <WizFlatTr>
          {[1, 2].map((i) => (
            <WizFlatTh key={i} colSpan={2}>
              Column {i}
            </WizFlatTh>
          ))}
        </WizFlatTr>
      </WizFlatThead>
      <WizFlatTbody>
        <WizFlatTr>
          <WizFlatTh scope="row" colSpan={4}>
            Row 1
          </WizFlatTh>
        </WizFlatTr>
        <WizFlatTr>
          <WizFlatTd colSpan={4}>Row 2</WizFlatTd>
        </WizFlatTr>
        {[1, 2, 3, 4].map((j) => (
          <WizFlatTd key={j}>Row 3</WizFlatTd>
        ))}
      </WizFlatTbody>
    </WizFlatTable>
  ),
};
