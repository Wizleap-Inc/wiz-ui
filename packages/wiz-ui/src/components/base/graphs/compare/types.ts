import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";

export interface CompareGraphData {
  label: string;
  data: {
    frequency: number;
    barColor?: ColorKeys;
    textColor?: ColorKeys;
  }[];
}
