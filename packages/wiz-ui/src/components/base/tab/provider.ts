import { InjectionKey } from "vue";

export const useTabProvider = () => {
  const tabRelationId = Math.random().toString(36).slice(2);
  const tabContentId = `wiz-tab-content-[${tabRelationId}]`;

  return {
    tabContentId,
  };
};

export const tabProviderKey: InjectionKey<ReturnType<typeof useTabProvider>> =
  Symbol("tab-provider");
