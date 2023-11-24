import { Meta, StoryObj } from "@storybook/react";

import {
  WizUnstyledTable,
  WizUnstyledThead,
  WizUnstyledTbody,
  WizUnstyledTr,
  WizUnstyledTh,
  WizUnstyledTd,
} from "../components";

const meta: Meta<typeof WizUnstyledTable> = {
  title: "Base/Tables/Unstyled",
  component: WizUnstyledTable,
};

export default meta;

export const Default: StoryObj<typeof WizUnstyledTable> = {
  render: (args) => (
    <WizUnstyledTable {...args}>
      <WizUnstyledThead>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i}>Column {i}</WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i}>
            {[1, 2, 3].map((j) => (
              <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>
            ))}
          </WizUnstyledTr>
        ))}
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};

export const Fixed: StoryObj<typeof WizUnstyledTable> = {
  args: {
    fixed: true,
    width: "600px",
  },
  render: (args) => (
    <WizUnstyledTable {...args}>
      <WizUnstyledThead>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i} width={`calc(100px * ${i})`}>
              Column {i}
            </WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i}>
            {[1, 2, 3].map((j) => (
              <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>
            ))}
          </WizUnstyledTr>
        ))}
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};

export const TextAlign: StoryObj<typeof WizUnstyledTable> = {
  render: (args) => {
    const textAligns: ("left" | "center" | "right")[] = [
      "left",
      "center",
      "right",
    ];
    return (
      <WizUnstyledTable {...args}>
        <WizUnstyledThead>
          <WizUnstyledTr>
            {textAligns.map((align, index) => (
              <WizUnstyledTh key={index} width="200px" align={align}>
                Column {index + 1}
              </WizUnstyledTh>
            ))}
          </WizUnstyledTr>
        </WizUnstyledThead>
        <WizUnstyledTbody>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTr key={i}>
              {textAligns.map((align, index) => (
                <WizUnstyledTd key={index} width="200px" align={align}>
                  Row {index + 1}
                </WizUnstyledTd>
              ))}
            </WizUnstyledTr>
          ))}
        </WizUnstyledTbody>
      </WizUnstyledTable>
    );
  },
};

export const WithRowHeader: StoryObj<typeof WizUnstyledTable> = {
  render: (args) => (
    <WizUnstyledTable {...args}>
      <WizUnstyledThead>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i}>Column {i}</WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i}>
            {[1, 2, 3].map((j) => (
              <>
                {j === 1 && <WizUnstyledTh key={j}>Row {i}</WizUnstyledTh>}
                {j > 1 && <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>}
              </>
            ))}
          </WizUnstyledTr>
        ))}
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};

// MEMO: 関連コンポーネントの追加待ち
// export const UseAsForm: StoryObj<typeof WizUnstyledTable> = {
//   render: (args) => {
//     return (
//       <WizUnstyledTable space="xs2" {...args}>
//         <WizUnstyledTbody>
//           <WizUnstyledTr>
//             <WizUnstyledTd align="right">
//               {/* <WizText>First Name</WizText> */}
//             </WizUnstyledTd>
//             <WizUnstyledTd align="right">
//               {/* <WizTextInput expand placeholder="First Name" /> */}
//             </WizUnstyledTd>
//           </WizUnstyledTr>
//           <WizUnstyledTr>
//             <WizUnstyledTd align="right">
//               {/* <WizText>Last Name</WizText> */}
//             </WizUnstyledTd>
//             <WizUnstyledTd align="right">
//               {/* <WizTextInput expand placeholder="Last Name" /> */}
//             </WizUnstyledTd>
//           </WizUnstyledTr>
//           <WizUnstyledTr>
//             <WizUnstyledTd align="right" width="120px">
//               {/* <WizText>ID</WizText> */}
//             </WizUnstyledTd>
//             <WizUnstyledTd align="right">
//               {/* <WizText color="gray.500" bold lineHeight="xl6">
//                 XXXX-XXXX-XXXX
//               </WizText> */}
//             </WizUnstyledTd>
//           </WizUnstyledTr>
//           <WizUnstyledTr>
//             <WizUnstyledTd align="right">
//               {/* <WizText>生年月日</WizText> */}
//             </WizUnstyledTd>
//             <WizUnstyledTd align="right">
//               {/* <WizHStack gap="xs2">
//                 <WizTextInput expand placeholder="Year" />
//                 <WizTextInput expand placeholder="Month" />
//                 <WizTextInput expand placeholder="Day" />
//               </WizHStack> */}
//             </WizUnstyledTd>
//           </WizUnstyledTr>
//         </WizUnstyledTbody>
//       </WizUnstyledTable>
//     );
//   },
// };

export const Divider: StoryObj<typeof WizUnstyledTable> = {
  args: {
    borderCollapse: "collapse",
  },
  render: (args) => (
    <WizUnstyledTable {...args}>
      <WizUnstyledThead divider>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i}>Column {i}</WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i} divider>
            {[1, 2, 3].map((j) => (
              <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>
            ))}
          </WizUnstyledTr>
        ))}
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};

export const DividerHeader: StoryObj<typeof WizUnstyledTable> = {
  args: {
    borderCollapse: "collapse",
  },
  render: (args) => (
    <WizUnstyledTable {...args}>
      <WizUnstyledThead>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i} divider>
              Column {i}
            </WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i}>
            {[1, 2, 3].map((j) => (
              <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>
            ))}
          </WizUnstyledTr>
        ))}
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};

export const UnionRow: StoryObj<typeof WizUnstyledTable> = {
  args: {
    borderCollapse: "collapse",
  },
  render: (args) => (
    <WizUnstyledTable {...args}>
      <WizUnstyledThead divider>
        <WizUnstyledTr>
          {[1, 2, 3, 4].map((i) => (
            <WizUnstyledTh key={i}>Column {i}</WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3, 4].map((i) => (
          <WizUnstyledTr key={i} divider>
            {i === 1 && (
              <>
                <WizUnstyledTd rowSpan={4}>Row</WizUnstyledTd>
                <WizUnstyledTh scope="row" rowSpan={4}>
                  Row
                </WizUnstyledTh>
              </>
            )}
            {[1, 2].map((j) => (
              <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>
            ))}
          </WizUnstyledTr>
        ))}
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};

export const UnionColumn: StoryObj<typeof WizUnstyledTable> = {
  args: {
    borderCollapse: "collapse",
  },
  render: (args) => (
    <WizUnstyledTable {...args}>
      <WizUnstyledThead divider>
        <WizUnstyledTr>
          {[1, 2].map((i) => (
            <WizUnstyledTh key={i} colSpan={2}>
              Column {i}
            </WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i} divider>
            {[1, 2, 3].map((j) => (
              <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>
            ))}
          </WizUnstyledTr>
        ))}
        <WizUnstyledTr divider>
          <WizUnstyledTd colSpan={3}>Row</WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};
