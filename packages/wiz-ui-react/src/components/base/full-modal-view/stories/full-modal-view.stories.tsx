import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { WizTextButton } from "@/components";

import { WizFullModalView } from "../components/full-modal-view";

const meta: Meta<typeof WizFullModalView> = {
  title: "Base/FullModalView",
  component: WizFullModalView,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
    screenshot: {
      delay: 300,
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizFullModalView>;

const DUMMY_TEXT_1 =
  "Lorem ipsum dolor sit amet Sed sanctus et eu sea tempor dolor augue. Et sanctus rebum dolore eum diam vero ipsum dolore clita tempor takimata sanctus est invidunt sit sadipscing. Consetetur dolor magna autem dolore doming hendrerit aliquyam. Ut odio consectetuer lorem dolor doming sanctus esse vel at eros eirmod luptatum sea et enim ut sed. Lorem sit aliquyam dignissim duo ea ipsum. Nulla iusto dolor vulputate. Consequat eirmod accusam feugiat ea sea ut magna sit dolor gubergren et. Sed dolor amet no ut kasd est blandit no. Est sit enim nonumy adipiscing ut no dolore luptatum iusto ea ad feugiat lorem lorem aliquyam sadipscing eos vero. Lorem assum consequat ut vero diam aliquyam et iusto sit. Te sanctus et ut nulla lorem justo erat dolore gubergren lorem te et vulputate. Duo tempor eirmod nonumy ut magna clita. Justo sit justo erat rebum no velit esse sed eirmod sea in voluptua sea dolore at. Ut aliquam nostrud sadipscing veniam consetetur dolor ipsum ut et molestie nobis. Gubergren sit et consequat dolor consectetuer aliquyam ullamcorper. Suscipit sanctus iusto at sit. Ipsum ipsum diam sed sanctus vel.";
const DUMMY_TEXT_2 =
  "Adipiscing ipsum et lorem dolores magna stet tempor duo tempor nulla et takimata eos. Sanctus vel delenit ea ipsum rebum nam lobortis ipsum dolores eros amet diam clita eum justo ut. Eos ad commodo congue consetetur clita eu sed molestie eirmod ut rebum. Blandit voluptua esse et vero sed ad facilisis no sed minim dolore ut. No id eum et vel erat vero labore vero nibh sea vulputate dolor est.";

export const Default: Story = {
  args: {
    isOpen: true,
  },

  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    useEffect(() => {
      setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
      <>
        <WizFullModalView
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <h1>FullModalView</h1>
          <div style={{ height: "120vh" }}>{DUMMY_TEXT_1}</div>
        </WizFullModalView>
        <WizTextButton onClick={() => setIsOpen(true)}>Open</WizTextButton>
        <div>{DUMMY_TEXT_2}</div>
      </>
    );
  },
};
export const WithHeader: Story = {
  args: {
    isOpen: true,
    title: "FullModalView",
    header: (
      <WizTextButton size="md" variant="sub">
        条件をリセット
      </WizTextButton>
    ),
  },

  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    useEffect(() => {
      setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
      <>
        <WizFullModalView
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <h1>FullModalView</h1>
          <div>{DUMMY_TEXT_1}</div>
        </WizFullModalView>
        <WizTextButton onClick={() => setIsOpen(true)}>Open</WizTextButton>
        <div>{DUMMY_TEXT_2}</div>
      </>
    );
  },
};
