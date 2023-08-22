import { Meta, StoryObj } from "@storybook/react";

import { WizUploadInput } from "../components";

const meta: Meta<typeof WizUploadInput> = {
  title: "Base/Input/Upload",
  component: WizUploadInput,
};

export default meta;
type Story = StoryObj<typeof WizUploadInput>;

const Template: Story = {
  render: (args) => {
    const setupXML = () => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:6006", true);
      xhr.onload = () => {
        console.log("done");
      };
      return xhr;
    };
    return (
      <div style={{ padding: 100 }}>
        <WizUploadInput {...args} setupXHR={setupXML} />
      </div>
    );
  },
};

export const Default: Story = {
  ...Template,
  parameters: {
    docs: {
      description: {
        story: `
setupXMLでXMLHttpRequestを設定する必要があります<br>
XMLHttpRequestのインスタンスに対して、openメソッドでアップロード先のURL、request methodを指定してください。アップロード完了時の挙動なども指定できます。
      `,
      },
    },
  },
};

export const Multiple: Story = {
  ...Template,
  args: {
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "multipleをtrueにすると、複数ファイルのアップロードが可能になります。",
      },
    },
  },
};
