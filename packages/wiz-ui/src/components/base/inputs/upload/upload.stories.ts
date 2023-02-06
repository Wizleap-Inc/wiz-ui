import { StoryFn } from "@storybook/vue";

import { WizUpload } from ".";

export default {
  title: "Base/Input/Upload",
  component: WizUpload,
  argTypes: {},
};

const Template: StoryFn<typeof WizUpload> = (args) => ({
  components: { WizUpload },
  setup() {
    const uploadUrl = "http://localhost:6006";
    const xhr = () => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", uploadUrl, true);
      return xhr;
    };
    return { uploadUrl, args, xhr };
  },
  template: `<div style="padding:100px;"><WizUpload v-bind="args" :xhr="xhr"/></div>`,
});

export const Default = Template.bind({});

export const XHR = Template.bind({});
XHR.args = {
  xhr: () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:6006", true);
    xhr.onload = () => {
      console.log("done");
    };
    return xhr;
  },
};
XHR.parameters = {
  docs: {
    description: {
      story: `
xhrには必ずXMLHttpRequestのインスタンスを返す関数を渡す必要があります<br>
xhrに対して、openメソッドでアップロード先のURL、request methodを指定してください。アップロード完了時の挙動なども指定できます。
      `,
    },
    source: {
      code: `
const xhr = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:6006", true);
    xhr.onload = () => {
        console.log("done");
    };
    return xhr;
};
<WizUpload :xhr="xhr"/>
  `,
    },
  },
};

export const MULTIPLE = Template.bind({});
MULTIPLE.args = {
  multiple: true,
  xhr: () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:6006", true);
    return xhr;
  },
};
MULTIPLE.parameters = {
  docs: {
    description: {
      story: `
multipleをtrueにすると、複数ファイルのアップロードが可能になります。
      `,
    },
    source: {
      code: `
const xhr = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:6006", true);
    return xhr;
};
const multiple = true;
<WizUpload :xhr="xhr" :multiple="multiple"/>
  `,
    },
  },
};
