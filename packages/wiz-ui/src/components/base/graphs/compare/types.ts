import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";

export interface CompareGraphData {
  label: string;
  data: {
    id: string;
    frequency: number;
    barColor?: ColorKeys;
    numberColor?: ColorKeys;
  }[];
}
