import { Meta, StoryObj } from "@storybook/react";

import {
  WizUnstyledTable,
  WizUnstyledThead,
  WizUnstyledTbody,
  WizUnstyledTr,
  WizUnstyledTh,
  WizUnstyledTd,
} from "../components";

const meta: Meta<typeof WizUnstyledTr> = {
  title: "Base/Tables/Unstyled",
  component: WizUnstyledTr,
  argTypes: {
    onClick: {
      action: "onClick",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof WizUnstyledTr> = {
  render: (args) => (
    <WizUnstyledTable>
      <WizUnstyledThead>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i}>Column {i}</WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i} {...args}>
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

export const WithRowHeader: StoryObj<typeof WizUnstyledTr> = {
  render: (args) => (
    <WizUnstyledTable>
      <WizUnstyledThead>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i}>Column {i}</WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i} {...args}>
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

export const Divider: StoryObj<typeof WizUnstyledTr> = {
  render: (args) => (
    <WizUnstyledTable borderCollapse={"collapse"}>
      <WizUnstyledThead divider={true}>
        <WizUnstyledTr>
          {[1, 2, 3].map((i) => (
            <WizUnstyledTh key={i}>Column {i}</WizUnstyledTh>
          ))}
        </WizUnstyledTr>
      </WizUnstyledThead>
      <WizUnstyledTbody>
        {[1, 2, 3].map((i) => (
          <WizUnstyledTr key={i} {...args} divider={true}>
            {[1, 2, 3].map((j) => (
              <WizUnstyledTd key={j}>Row {i}</WizUnstyledTd>
            ))}
          </WizUnstyledTr>
        ))}
      </WizUnstyledTbody>
    </WizUnstyledTable>
  ),
};
