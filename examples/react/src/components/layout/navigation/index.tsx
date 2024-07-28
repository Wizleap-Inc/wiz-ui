import {
  WizAnchor,
  WizIAssignment,
  WizIBusinessCenter,
  WizIChat,
  WizIDashboard,
  WizIHelp,
  WizIOpenInNew,
  WizNavigationContainer,
  WizNavigationItem,
  WizVStack,
} from "@wizleap-inc/wiz-ui-react";

const navItems = [
  {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
  },
  {
    icon: WizIAssignment,
    label: "About",
    href: "/about",
  },
  {
    icon: WizIBusinessCenter,
    label: "Contact",
    href: "/contact",
  },
  {
    icon: WizIChat,
    label: "Chat",
    href: "/chat",
  },
  {
    icon: WizIHelp,
    label: "Help",
    href: "https://wizleap.co.jp",
  },
];

const Footer = () => (
  <WizVStack>
    <WizAnchor
      href="https://wizleap.co.jp"
      icon={WizIOpenInNew}
      iconPosition="right"
      color="gray.700"
      fontSize="sm"
      openInNewTab
      nowrap
    >
      会社概要
    </WizAnchor>
    <WizAnchor
      href="https://wizleap.co.jp/services/"
      icon={WizIOpenInNew}
      iconPosition="right"
      color="gray.700"
      fontSize="sm"
      openInNewTab
      nowrap
    >
      サービス
    </WizAnchor>
    <WizAnchor
      href="https://wizleap.co.jp/news/"
      icon={WizIOpenInNew}
      iconPosition="right"
      color="gray.700"
      fontSize="sm"
      openInNewTab
      nowrap
    >
      ニュース
    </WizAnchor>
  </WizVStack>
);

type NavigationProps = {
  isOpen: boolean;
};

export const Navigation = ({ isOpen }: NavigationProps) => {
  return (
    <WizNavigationContainer
      style={{ display: "flex", height: "90vh" }}
      isOpen={isOpen}
      footer={<Footer />}
    >
      {navItems.map((path) => (
        <WizNavigationItem
          key={`path-${path.label}`}
          icon={path.icon}
          label={path.label}
          href="/"
          active={false}
        />
      ))}
    </WizNavigationContainer>
  );
};
